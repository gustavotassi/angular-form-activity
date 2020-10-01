import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'angular-activity-form';
  hide = true;
  arrN: any[] = [];

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.createContactForm();
  }

  ngOnInit(): void {
    const verificaLocal = JSON.parse(localStorage.getItem('people'));

    if (verificaLocal !== null) {
      this.arrN = verificaLocal;
    }
  }

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
    });
  }

  onSubmit() {
    console.log(this.contactForm.value);

    // Preciso criar uma array dos valores do form
    // Adicionando a cada submit os valores inseridos
    // Criando uma var de array
    let arr: any[] = [];
    // Criando o verifica local para saber o que tem no meu localStorage
    const verificaLocal = JSON.parse(localStorage.getItem('people'));

    console.log(verificaLocal);

    if (verificaLocal !== null) {
      arr = verificaLocal;
      arr.push(this.contactForm.value);
      localStorage.setItem('people', JSON.stringify(arr));
      this.arrN.push(this.contactForm.value);
    } else {
      arr = [this.contactForm.value];
      localStorage.setItem('people', JSON.stringify(arr));
      this.arrN.push(this.contactForm.value);
    }

    const formData: any = new FormData();
    formData.append('name', this.contactForm.get('name').value);
    formData.append('surname', this.contactForm.get('surname').value);
    formData.append('email', this.contactForm.get('email').value);
    formData.append('cpf', this.contactForm.get('cpf').value);
    formData.append('password', this.contactForm.get('password').value);

    const object: any = {};
    formData.forEach((value, key) => {object[key] = value; });

    this.http.post('http://localhost:3000/api', object).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );

    // Limpando os valores dos campos sem erro //
    this.contactForm.reset();
  }

  deleteEntry(element) {
    const formData: any = new FormData();
    formData.append('cpf', element.cpf);

    const object: any = {};
    formData.forEach((value, key) => {object[key] = value; });

    this.http.post('http://localhost:3000/delete', object).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    );

    const arrP: any[] = JSON.parse(localStorage.getItem('people'));
    let indexDelete: number;
    arrP.forEach((p, i) => {
        if (p.name === element.name && p.cpf === element.cpf) {
            indexDelete = i;
        }
    });
    this.arrN.splice(indexDelete, 1);
    arrP.splice(indexDelete, 1);
    localStorage.setItem('people', JSON.stringify(arrP));
  }

  updateEntry(element) {
    this.contactForm.get('name').setValue(element.name);
    this.contactForm.get('surname').setValue(element.surname);
    this.contactForm.get('email').setValue(element.email);
    this.contactForm.get('cpf').setValue(element.cpf);
    this.contactForm.get('password').setValue(element.password);
  }
}
