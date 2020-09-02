import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushModalComponent } from './push-modal.component';

describe('PushModalComponent', () => {
  let component: PushModalComponent;
  let fixture: ComponentFixture<PushModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
