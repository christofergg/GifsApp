import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifHistoryPageComponent } from './gif-history-page.component';

describe('GifHistoryPageComponent', () => {
  let component: GifHistoryPageComponent;
  let fixture: ComponentFixture<GifHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
