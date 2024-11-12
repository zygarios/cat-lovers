import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CatFactsService } from '../../_services/cat-facts.service';

@Component({
  selector: 'app-cat-facts',
  standalone: true,
  imports: [],
  templateUrl: './cat-facts.component.html',
  styleUrls: ['./cat-facts.component.scss'],
})
export class CatFactsComponent {
  private _catFactsService = inject(CatFactsService);
  private _intersectionRef =
    viewChild<ElementRef<HTMLDivElement>>('intersectionRef');
  private _observerRef: IntersectionObserver | null = null;
  catFacts = signal<string[]>([]);
  private _hostElementRef = inject(ElementRef);
  private _isLoading = false;

  constructor() {
    this._loadCatFacts();

    afterNextRender(() => {
      this._setlazyLoadDataOnScroll();
    });
  }

  private _loadCatFacts() {
    const { height, top } =
      this._hostElementRef.nativeElement.getBoundingClientRect();

    if (height > window.innerHeight - top) {
      this._isLoading = false;
    } else {
      this._isLoading = true;
      this._catFactsService.getRandomCatFact().subscribe((fact: string) => {
        if (!this.catFacts().includes(fact)) {
          this.catFacts.update((facts) => [...facts, fact]);
        }
        this._loadCatFacts();
      });
    }
  }

  private _setlazyLoadDataOnScroll() {
    if (this._intersectionRef()) {
      this._observerRef = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this._isLoading) {
            this._loadCatFacts();
          }
        },
        { rootMargin: '0px', threshold: 1.0 },
      );
      this._observerRef.observe(this._intersectionRef()!.nativeElement);
    }
  }

  ngOnDestroy() {
    this._observerRef?.disconnect();
  }
}
