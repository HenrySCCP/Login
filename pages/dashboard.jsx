import nookies from 'nookies';
import { useRouter } from 'next/router';

export async function getServerSideProps(context){    
    const cookies = nookies.get(context);
    const senhaUsuario = '123456';
    const senhaForm = cookies.senha;
    const isAutorizado = senhaUsuario === senhaForm;

    if(!isAutorizado){
        return{
            redirect:{
                permanent: false,
                destination: '/'
            }
        }
    }

    return {
        props:{

        }
    }
}

export default function Dashboard(props){
    const router = useRouter();

    return(
        <>
            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-main">
                <div className="container">
                    <div className="box-form">
                        <h1 className="text-center">Dashboard</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <button
                                onClick={() => {
                                    nookies.destroy(null, 'senha');
                                    router.push('/');
                                }}
                                className="btn btn-danger"
                            >
                                Sair
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}