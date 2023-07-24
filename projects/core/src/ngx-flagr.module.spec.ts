import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFlagService } from './feature-flag.service';
import { NgxFlagrModule } from './ngx-flagr.module';
import { FEATURE_FLAG_SERVICE } from './tokens';

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

describe('NgxFlagrModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [NgxFlagrModule],
      providers: [TestFeatureFlagService],
    });
  });

  it('should not create the component', () => {
    expect(() => TestBed.createComponent(HostComponent)).toThrowError(
      /FeatureFlagService implementation not provided/
    );
  });
});

describe('NgxFlagrModule.forRoot()', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        NgxFlagrModule.forRoot({
          featureFlagService: TestFeatureFlagService,
        }),
      ],
      providers: [TestFeatureFlagService],
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('provides the desired service', () => {
    expect(TestBed.inject(FEATURE_FLAG_SERVICE)).toBeInstanceOf(
      TestFeatureFlagService
    );
  });
});
