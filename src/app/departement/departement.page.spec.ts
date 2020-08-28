import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepartementPage } from './departement.page';

describe('DepartementPage', () => {
  let component: DepartementPage;
  let fixture: ComponentFixture<DepartementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
