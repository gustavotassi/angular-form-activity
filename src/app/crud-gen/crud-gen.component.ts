import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudSourceService } from '../services/crud-source.service';

@Component({
    selector: 'fre-crud-gen',
    templateUrl: './crud-gen.component.html',
    styleUrls: ['./crud-gen.component.scss'],
})
export class CrudGenComponent implements OnInit {
    constructor(
        public crudService: CrudSourceService,
        private route: ActivatedRoute
    ) {}

    screen: string;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.screen = params.get('screen');

            this.crudService.notifyScreenChange(this.screen);
        });
    }
}
