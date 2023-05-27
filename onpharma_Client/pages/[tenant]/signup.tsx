import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { InputField } from '@/components/inputField';
import { useAppContext } from '@/contexts/app';
import { useApi } from '@/libs/userApi';
import styles from '@/styles/SignUp.module.css'
import { Tenant } from '@/types/Tenant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const SignUp = (data: Props) => {
  const {tenant, setTenant} = useAppContext();
  useEffect(() => {
    setTenant(data.tenant);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
 
  const heandleSubmit = () => {

  };
  const heandleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`);
  };

  return (
    
    <div className={styles.container}>
        <Head>
            <title>Cadastro | {data.tenant.name}</title>
        </Head>

        <Header 
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}/login`}
        />

        <div className={styles.header}>{data.tenant.name}</div>

        <div 
          className={styles.subtitle}
          style={{ borderBottomColor: data.tenant.mainColor }}
        >Preencha os campos para criar o seu cadastro.</div>
        <div className={styles.line}></div>
        
        <div className={styles.formArea}>
       
        <div className={styles.inputArea}>
                <InputField
                  color = {data.tenant.mainColor}
                  placeholder='Digite seu Nome'
                  value={name}
                  onChange={setName}
                />
            </div>
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
                    label = "Cadastrar"
                    onClick = {heandleSubmit}
                    fill
                  />
            </div> 
            <div className={styles.forgetArea}>
                Ja tem cadastro? <Link legacyBehavior href={`/${data.tenant.slug}/login`}><a style={{ color: data.tenant.mainColor }}>Fazer Login</a></Link>
            </div>
        </div>
    </div>
  );

}

export default SignUp;

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