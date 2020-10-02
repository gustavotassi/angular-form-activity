import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './interfaces/Person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'angular-activity-form';
  hide = true;
  substituir = false;
  arrN: any[] = [];

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.createContactForm();
  }

  ngOnInit(): void {
    this.getPeople().subscribe(
      data => {
        this.arrN = data;
        console.log(data);
      },
      err  => console.log(err)
    );

    this.substituir = false;
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

    // Preciso criar uma array dos valores do form
    // Adicionando a cada submit os valores inseridos
    // Criando uma var de array

    this.arrN.push(this.contactForm.value);

    const formData: any = new FormData();
    formData.append('name', this.contactForm.get('name').value);
    formData.append('surname', this.contactForm.get('surname').value);
    formData.append('email', this.contactForm.get('email').value);
    formData.append('cpf', this.contactForm.get('cpf').value);
    formData.append('password', this.contactForm.get('password').value);
    formData.append('replace', this.substituir ? 501 : 500);

    const object: any = {};
    formData.forEach((value, key) => {object[key] = value; });

    this.http.post('http://localhost:3000/api', object).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );


    // Limpando os valores dos campos sem erro //
    this.contactForm.reset();

    this.getPeople().subscribe(
      data => {
        this.arrN = data;
      },
      err  => console.log(err)
    );
  }

  deleteEntry(element) {
    const formData: any = new FormData();
    formData.append('id', element.pesID);

    const object: any = {};
    formData.forEach((value, key) => {object[key] = value; });

    this.http.post('http://localhost:3000/delete', object).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    );

    this.getPeople().subscribe(
      data => {
        this.arrN = data;
      },
      err  => console.log(err)
    );
    let indexDelete: number;
    this.arrN.forEach((p, i) => {
        if (p.name === element.name && p.cpf === element.cpf) {
            indexDelete = i;
        }
    });
    this.arrN.splice(indexDelete, 1);
  }

  updateEntry(element) {
    this.contactForm.get('name').setValue(element.pesNome);
    this.contactForm.get('surname').setValue(element.pesSobrenome);
    this.contactForm.get('email').setValue(element.pesEmail);
    this.contactForm.get('cpf').setValue(element.pesCpf);
    this.contactForm.get('password').setValue(element.pesSenha);

    this.substituir = true;
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('http://localhost:3000/getPessoas');
  }
}
