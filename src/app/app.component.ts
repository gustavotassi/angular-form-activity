import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-activity-form';

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  hide = true;

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['',
        [Validators.required,
        Validators.minLength(2)]
      ],
      surname: ['',
        [Validators.required,
        Validators.minLength(2)]
      ],
      email: ['',
        [Validators.required,
        Validators.email]
      ],
      cpf: ['',
        [Validators.required,
        Validators.maxLength(11)]
      ],
      password: ['',
        [Validators.required,
        Validators.minLength(4)]
      ],
      people: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  onSubmit() {
    console.log(this.contactForm.value);
    console.log(this.contactForm.status);

    // Limpando os valores dos campos -- VERIFICAR //

    this.contactForm.patchValue({
      name: '',
      surname: '',
      email: '',
      cpf: '',
      password: '',
    });
  }
}
