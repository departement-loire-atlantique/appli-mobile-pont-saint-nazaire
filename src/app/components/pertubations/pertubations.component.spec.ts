import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PertubationsComponent } from './pertubations.component';

describe('PertubationsComponent', () => {
  let component: PertubationsComponent;
  let fixture: ComponentFixture<PertubationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertubationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PertubationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
