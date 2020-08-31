import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherAppsPage } from './other-apps.page';

describe('OtherAppsPage', () => {
  let component: OtherAppsPage;
  let fixture: ComponentFixture<OtherAppsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAppsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherAppsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
