import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();

    const [token,setToken] = useState('')

    useEffect(()=>{
        const getLinkToken = async()=>{
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    },[user]);

    const onSuccess = useCallback(async (public_token:string) => {
        await exchangePublicToken({
            publicToken:public_token,
            user,
        })

        router.push('/');
    },[user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }
    return (
        <>
            {variant === 'primary'?(
                <Button className='plaidlink-primary'>
                    Conenct Bank
                </Button>
            ): variant ==='ghost'?(
            <Button>
                Conenct Bank
            </Button>
            ):(
                <Button>
                    Connect Bank
                </Button>
            )
    }
        </>
    )
}

export default PlaidLink
