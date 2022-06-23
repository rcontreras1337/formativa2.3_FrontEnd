import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'formativa_2.3';

  nombre: string = "";
  correo: string = "";
  numero: string = "";

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    numero: new FormControl(''),
  });

  formValido: boolean = false;
  submitted : boolean = false;

  get f(): {[key: string]: AbstractControl} {
    return this.form.controls;
    }

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.makeFormBuilder();
  }

  onReset(): void{
    this.submitted=false;
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid){
      // si estuviera mal
      swal.fire({
        title: 'Rellene los campos Correctamente',
        icon: 'warning',
      });
      this.submitted = true;
      this.formValido = false;
    } else {
      this.formValido = true;
    }
  }

  makeFormBuilder(){
    this.form = this.formBuilder.group(
      {
        nombre:['',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
          ]
        ],
        correo:['',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g)
          ]
        ],
        numero:['',
          [
            Validators.required,
            Validators.pattern(/[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{3}/g)
          ]
        ],
      }
    );
  }
}
