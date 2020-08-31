import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationsPage } from './informations.page';

describe('InformationsPage', () => {
  let component: InformationsPage;
  let fixture: ComponentFixture<InformationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
