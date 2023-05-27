import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { InputField } from '@/components/inputField';
import { useAppContext } from '@/contexts/app';
import { useApi } from '@/libs/userApi';
import styles from '@/styles/Forget.module.css'
import { Tenant } from '@/types/Tenant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Forget = (data: Props) => {
  const {tenant, setTenant} = useAppContext();
  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [email, setEmail] = useState('');
  const router = useRouter();
 
  const heandleSubmit = () => {
        router.push(`/${data.tenant.slug}/forget-sucess`);
  };


  return (
    
    <div className={styles.container}>
        <Head>
            <title>Esqueci a Senha | {data.tenant.name}</title>
        </Head>

        <Header 
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}/login`}
        />

        <div className={styles.header}>{data.tenant.name}</div>

        <div className={styles.title}>Esqueceu sua Senha?</div>

        <div 
          className={styles.subtitle}
          style={{ borderBottomColor: data.tenant.mainColor }}
        >Preencha o campo com seu e-mail e receba as instrucoes necessarias para redefinir a sua senha.</div>
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
                  <Button 
                    color = {data.tenant.mainColor}
                    label = "Enviar"
                    onClick = {heandleSubmit}
                    fill
                  />
            </div> 
        </div>
    </div>
  );

}

export default Forget;

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