import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../../core/services/cart.service';
import { BehaviorSubject, of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['getCart']);
    
    // Default emission for getCart upon component initialization
    mockCartService.getCart.and.returnValue(new BehaviorSubject<any>([]));

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit (Cart Items Grouping)', () => {
    it('should group identical cart items and calculate their initial quantities and prices', () => {
      const mockItems: any[] = [
        { id: 1, image: 'img1.jpg', name: 'Product 1', title: 'P1', price: 10 },
        { id: 1, image: 'img1.jpg', name: 'Product 1', title: 'P1', price: 10 }, // Duplicate item
        { id: 2, image: 'img2.jpg', name: 'Product 2', title: 'P2', price: 20 }
      ];
      
      mockCartService.getCart.and.returnValue(new BehaviorSubject<any>(mockItems));
      
      // Trigger ngOnInit manually to simulate new stream value
      component.ngOnInit();
      
      expect(component.cartItems.length).toBe(2);
      
      // Assert first grouped item (id: 1)
      const item1 = component.cartItems.find(i => i.id === 1);
      expect(item1?.quantity).toBe(2);
      expect(item1?.unitPrice).toBe(10);
      expect(item1?.totalPrice).toBe(20);
      
      // Assert second item (id: 2)
      const item2 = component.cartItems.find(i => i.id === 2);
      expect(item2?.quantity).toBe(1);
      expect(item2?.unitPrice).toBe(20);
      expect(item2?.totalPrice).toBe(20);
    });
  });

  describe('increase', () => {
    it('should increase item quantity and recalculate total price', () => {
      component.cartItems = [
        { id: 1, name: 'Product', unitPrice: 15, quantity: 1, totalPrice: 15 } as any
      ];
      
      // Pass an item object containing the id
      component.increase({ id: 1 });
      
      expect(component.cartItems[0].quantity).toBe(2);
      expect(component.cartItems[0].totalPrice).toBe(30);
    });

    it('should not increase quantity if the item is not found', () => {
      component.cartItems = [
        { id: 1, name: 'Product', unitPrice: 15, quantity: 1, totalPrice: 15 } as any
      ];
      
      component.increase({ id: 2 });
      
      expect(component.cartItems[0].quantity).toBe(1);
    });
  });

  describe('decrease', () => {
    it('should decrease item quantity and update total price if quantity is greater than 1', () => {
      component.cartItems = [
        { id: 1, name: 'Product', unitPrice: 15, quantity: 2, totalPrice: 30 } as any
      ];
      
      component.decrease({ id: 1 });
      
      expect(component.cartItems.length).toBe(1);
      expect(component.cartItems[0].quantity).toBe(1);
      expect(component.cartItems[0].totalPrice).toBe(15);
    });

    it('should remove the item from cartItems entirely if quantity is 1', () => {
      component.cartItems = [
        { id: 1, name: 'Product', unitPrice: 15, quantity: 1, totalPrice: 15 } as any
      ];
      
      component.decrease({ id: 1 });
      
      expect(component.cartItems.length).toBe(0);
    });
  });
});
