import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authenticate } from '../../../model';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

    @Input()
    set pending( isPending: boolean ) {
        if (isPending) {
            this.loginForm.disable();
        } else {
            this.loginForm.enable();
        }
    }

    @Output() formSubmit = new EventEmitter<Authenticate>();

    public loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor( private fb: FormBuilder ) {
    }

    ngOnInit() {
    }

    public handleLoginFormSubmit() {
        if (this.loginForm.valid) {
            this.formSubmit.emit(this.loginForm.value);
        }
    }
}
