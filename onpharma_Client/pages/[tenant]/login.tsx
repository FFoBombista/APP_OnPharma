import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { InputField } from '@/components/inputField';
import { useAppContext } from '@/contexts/app';
import { useAuthContext } from '@/contexts/auth';
import { useApi } from '@/libs/userApi';
import styles from '@/styles/Login.module.css'
import { Tenant } from '@/types/Tenant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Login = (data: Props) => {

  const {setToken, setUser} = useAuthContext();

  const {tenant, setTenant} = useAppContext();
  useEffect(() => {
    setTenant(data.tenant);
  }, []);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
 
  const heandleSubmit = () => {
    setToken('1234');
    setUser({
      name: 'Tiago Castro',
      email: 'admin@admin.com'
    });
    router.push(`/${data.tenant.slug}`);
  };

  const heandleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`);
  };

  return (
    
    <div className={styles.container}>
        <Head>
            <title>Login | {data.tenant.name}</title>
        </Head>

        <Header 
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
        />

        <div className={styles.header}>{data.tenant.name}</div>

        <div 
          className={styles.subtitle}
          style={{ borderBottomColor: data.tenant.mainColor }}
        >Use suas credenciais para realizar o login.</div>
        <div className={styles.line}></div>
        
        <div className={styles.formArea}>
            <div className={styles.inputArea}>
                <InputField
                  color = {data.tenant.mainColor}
                  placeholder='Digite seu Email'
                  value={email}
                  onChange={setEmail}
                />
            </div>
            <div className={styles.inputArea}>
                <InputField
                  color = {data.tenant.mainColor}
                  placeholder='Digite sua Senha'
                  value={password}
                  onChange={setPassword}
                  password
                />
            </div>
            <div className={styles.inputArea}>
                  <Button 
                    color = {data.tenant.mainColor}
                    label = "Entrar"
                    onClick = {heandleSubmit}
                    fill
                  />
            </div> 
            <div 
              className={styles.forgetArea}
              style={{ borderBottomColor: data.tenant.mainColor }}
              >
                Esqueceu sua senha? <Link legacyBehavior href={`/${data.tenant.slug}/forget`}><a style={{ color: data.tenant.mainColor }}>Clique Aqui</a></Link>
            </div>

            <div className={styles.line}></div>

            <div className={styles.signupArea}>
                  <Button 
                    color = {data.tenant.mainColor}
                    label = "Quero me cadastrar"
                    onClick = {heandleSignUp}
                  />
            </div>
        </div>
    </div>
  );

}

export default Login;

type Props = {
  tenant: Tenant

}

export const getServerSideProps: GetServerSideProps = async (context) =>{
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // get tenant
  const tenant = await api.getTenant();
  if (!tenant){
    return{ redirect:{ destination: '/', permanent: false} }
  }
  
  return {
      props: {
        tenant
    }
  }

}