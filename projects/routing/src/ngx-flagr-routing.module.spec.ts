import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFlagService, NgxFlagrModule } from '@ngx-flagr/core';

import { NgxFlagrRoutingModule } from './ngx-flagr-routing.module';

@Injectable()
class TestFeatureFlagService implements FeatureFlagService {
  isEnabled(): boolean {
    return true;
  }
}

@Component({
  template: `<div *featureFlag="'flag'">Feature enabled</div>`,
})
class HostComponent {}

describe('NgxFlagrRoutingModule.forRoot()', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        NgxFlagrModule.forRoot({
          featureFlagService: TestFeatureFlagService,
        }),
        NgxFlagrRoutingModule.forRoot(),
      ],
      providers: [TestFeatureFlagService],
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
