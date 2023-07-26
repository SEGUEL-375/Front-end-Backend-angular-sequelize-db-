import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: [null, Validators.required],
      date_joined: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar';
      this.getUsuarios(this.id);
    }
  }

  getUsuarios(id: number) {
    this.loading = true;
    this._userService.getUsuarios(id).subscribe((data: Usuario) => {
      this.loading = false;
      this.form.setValue({
        username: data.username,
        email: data.email,
        password: data.password,
        date_joined: data.date_joined
      })
    })
  }

  addUser() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const usuario: Usuario = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      date_joined: this.form.value.date_joined,
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      usuario.id = this.id;
      this._userService.updateUsuarios(this.id, usuario).subscribe(() => {
        this.toastr.info(`El usuario ${usuario.username} fue actualizado con exito`, 'Usuario actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      // Es agregar
      this._userService.saveUsuarios(usuario).subscribe(() => {
        this.toastr.success(`El usuario ${usuario.username} fue registrado con exito`, 'Usuario registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }




  }

}
