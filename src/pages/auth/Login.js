import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {

    const [input, setInput] = useState({
        username: "",
        password: "",
      });
    const auth = useAuth();

    const handleSubmitEvent = (e) => {

        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
             auth.loginAction(input);
            return;
        }
        alert("Veuillez fournir un identifiant et un mot de passe valides");
        
        
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (

        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Carto</b>datasup</a>
                </div>

                {
                    auth.errorLogin ? (
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5><i className="icon fas fa-ban"></i> Erreur !</h5>
                            {auth.errorLogin}
                        </div>
                    ) : null
                }

                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form onSubmit={handleSubmitEvent}>
                        <div className="input-group mb-3">
                            <input
                                className="form-control" 
                                type="text"
                                id="user-email"
                                name="username"
                                placeholder="username"
                                aria-describedby="username"
                                aria-invalid="false"
                                onChange={handleInput}
                                />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div id="user-username" className="sr-only">
                            Please enter a valid username. It must contain at least 6 characters.
                        </div>
                        <div className="input-group mb-3">
                            <input
                                className="form-control" 
                                placeholder="Password"
                                type="password"
                                id="password"
                                name="password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                                onChange={handleInput}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div id="user-password" className="sr-only">
                            your password should be more than 6 character
                        </div>
                        <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">
                                Remember Me
                            </label>
                            </div>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </div>
                        </div>
                    </form>

                    <p className="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p className="mb-0">
                        <a href="/register" className="text-center">Register a new membership</a>
                    </p>
                    </div>
                </div>
            </div>
        </div>
        
    );

};

export default Login;