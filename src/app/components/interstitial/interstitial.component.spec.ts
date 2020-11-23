import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterstitialComponent } from './interstitial.component';

describe('InterstitialComponent', () => {
  let component: InterstitialComponent;
  let fixture: ComponentFixture<InterstitialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterstitialComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterstitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
