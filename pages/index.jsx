import nookies from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaExclamationTriangle, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

export default function HomePage(){
    const [senha, setSenha] = useState('');
    const [alerta, setAlerta] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const router = useRouter();
    const senhaUsuario = '123456';

    return(
        <>
            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-main">
                <div className="container">
                    <div className="box-form">
                        <h2 className="text-center">Login</h2>

                        <form onSubmit={(e) => {
                            e.preventDefault();

                            if(senha){
                                if(senha === senhaUsuario){
                                    nookies.set(null, 'senha', senha, {
                                        maxAge: 30 * 24 * 60 * 60,
                                        path: '/'
                                    });
                                    router.push('/dashboard');
                                }else{
                                    setAlerta('Senha inválida, tente novamente');
                                }
                            }else{
                                setAlerta('Informe sua senha');
                            }
                        }}>
                            <div className="form-input">
                                <input
                                    type={viewPassword?'text':'password'}
                                    name="senha"
                                    placeholder="Digite sua senha"
                                    value={senha} 
                                    onChange={(e) => {
                                        setSenha(e.target.value)
                                    }}
                                />
                                <div className="view_password" onClick={() => setViewPassword((viewPassword?false:true))}>
                                    {(viewPassword?<FaEyeSlash title="Esconder senha" />:<FaEye title="Exibir senha" />)}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Acessar
                                <FaSignInAlt className="ms-2" />
                            </button>
                            <span className="alerta text-danger text-center mt-3" style={{display: (alerta==''?'none':'block')}}>
                                <FaExclamationTriangle className="me-2" />
                                { alerta }                                
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}