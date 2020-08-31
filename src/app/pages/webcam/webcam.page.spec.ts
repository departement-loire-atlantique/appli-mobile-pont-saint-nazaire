import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebcamPage } from './webcam.page';

describe('WebcamPage', () => {
  let component: WebcamPage;
  let fixture: ComponentFixture<WebcamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebcamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
