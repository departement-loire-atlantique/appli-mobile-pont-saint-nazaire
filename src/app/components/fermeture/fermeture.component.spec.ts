import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FermetureComponent } from './fermeture.component';

describe('FermetureComponent', () => {
  let component: FermetureComponent;
  let fixture: ComponentFixture<FermetureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FermetureComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FermetureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
