'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import CustomInput from './Custominput'
import { authFormSchema } from '@/lib/utils';
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signUp } from '@/lib/actions/user.actions'
import { signIn } from '@/lib/actions/user.actions'



const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const loggedInUser = await getLoggedInUser();

  const formSchema = authFormSchema(type);
  //Define the form component 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  const onSubmit= async(data: z.infer<typeof formSchema>)=> {
  
    setIsLoading(true)

    try{
      if(type==='sign-up'){
        const newUser = await signUp(data);
        setUser(newUser);
      }

      if(type ==='sign-in'){
        const response = await signIn({
          email:data.email,
          password:data.password,
        })

        if(response) router.push("/")
      }
    }catch(error){
      console.log(error)
    }
    
    finally{
      setIsLoading(false);
    }
    
    
  }



  return (
    // <section className='auth-form'>
    //   <header className='flex flex-col gap-5 md:gap-8'>
    //     <Link href="/"
    //       className="mb-12 flex cursor-pointer
    //              items-center gap-1 "
    //     >
    //       <Image
    //         src="/icons/logo.svg"
    //         width={34}
    //         height={34}
    //         alt="HorizonLogo"

    //       />
    //       <h1 className="text-25 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
    //     </Link>
    //     <div className='flex flex-col gap-1 md:gap-3'>
    //       <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
    //         {user
    //           ? 'Link Account'
    //           : type === 'sign-in'
    //             ? 'Sign In'
    //             : 'Sign Up'
    //         }
    //         <p className='text-16 font-normal text-gray-600'>
    //           {
    //             user ?
    //               'Link your account to get startd'
    //               : 'Please enter your details'
    //           }
    //         </p>
    //       </h1>
    //     </div>
    //   </header>
    //   {user ?
    //     (
    //       <div className='flex flex-4 gap-4'>
    //       //PlaidLink
    //       </div>
    //     ) : (

    //       <Form {...form}>
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //           {type === 'sign-up' && (
    //             <>
    //               <div className='flex gap-4'>
    //                 <FormField
    //                   control={form.control}
    //                   name="firstName"
    //                   render={({ field }) => (
    //                     <div className='form-item'>
    //                       <FormLabel className='form-label'>
    //                         First Name
    //                       </FormLabel>
    //                       <div className='flex w-full flex-col'>
    //                         <FormControl>
    //                           <Input placeholder='Enter your First Name' className='input-class'></Input>
    //                         </FormControl>
    //                         <FormMessage className='form-message mt-2'></FormMessage>
    //                       </div>
    //                     </div>
    //                   )}
    //                 />

    //                 <FormField
    //                   control={form.control}
    //                   name="lastName"
    //                   render={({ field }) => (
    //                     <div className='form-item'>
    //                       <FormLabel className='form-label'>
    //                         Last name
    //                       </FormLabel>
    //                       <div className='flex w-full flex-col'>
    //                         <FormControl>
    //                           <Input placeholder='Enter your Last name' className='input-class'></Input>
    //                         </FormControl>
    //                         <FormMessage className='form-message mt-2'></FormMessage>
    //                       </div>
    //                     </div>
    //                   )}
    //                 />
    //               </div>


    //               <FormField
    //                 control={form.control}
    //                 name="address1"
    //                 render={({ field }) => (
    //                   <div className='form-item'>
    //                     <FormLabel className='form-label'>
    //                       Address
    //                     </FormLabel>
    //                     <div className='flex w-full flex-col'>
    //                       <FormControl>
    //                         <Input placeholder='Enter your specific address' className='input-class'></Input>
    //                       </FormControl>
    //                       <FormMessage className='form-message mt-2'></FormMessage>
    //                     </div>
    //                   </div>
    //                 )}
    //               />

    //               <div className='flex gap-4'>
    //               <FormField
    //                 control={form.control}
    //                 name="state"
    //                 render={({ field }) => (
    //                   <div className='form-item'>
    //                     <FormLabel className='form-label'>
    //                       State
    //                     </FormLabel>
    //                     <div className='flex w-full flex-col'>
    //                       <FormControl>
    //                         <Input placeholder='Example: NY' className='input-class'></Input>
    //                       </FormControl>
    //                       <FormMessage className='form-message mt-2'></FormMessage>
    //                     </div>
    //                   </div>
    //                 )}
    //               />

    //               <FormField
    //                 control={form.control}
    //                 name="postalCode"
    //                 render={({ field }) => (
    //                   <div className='form-item'>
    //                     <FormLabel className='form-label'>
    //                       Postal Code
    //                     </FormLabel>
    //                     <div className='flex w-full flex-col'>
    //                       <FormControl>
    //                         <Input placeholder='Example: 11101' className='input-class'></Input>
    //                       </FormControl>
    //                       <FormMessage className='form-message mt-2'></FormMessage>
    //                     </div>
    //                   </div>
    //                 )}
    //               />
    //               </div>
                  
    //                 <div className='flex gap-4'>
    //                 <FormField
    //                 control={form.control}
    //                 name="dateOfBirth"
    //                 render={({ field }) => (
    //                   <div className='form-item'>
    //                     <FormLabel className='form-label'>
    //                       Data of Birth
    //                     </FormLabel>
    //                     <div className='flex w-full flex-col'>
    //                       <FormControl>
    //                         <Input placeholder='YYYY-MM-DD' className='input-class'></Input>
    //                       </FormControl>
    //                       <FormMessage className='form-message mt-2'></FormMessage>
    //                     </div>
    //                   </div>
    //                 )}
    //               />

    //               <FormField
    //                 control={form.control}
    //                 name="ssn"
    //                 render={({ field }) => (
    //                   <div className='form-item'>
    //                     <FormLabel className='form-label'>
    //                       SSN
    //                     </FormLabel>
    //                     <div className='flex w-full flex-col'>
    //                       <FormControl>
    //                         <Input placeholder='Example:1234' className='input-class'></Input>
    //                       </FormControl>
    //                       <FormMessage className='form-message mt-2'></FormMessage>
    //                     </div>
    //                   </div>
    //                 )}
    //               />
    //                 </div>
                  


    //             </>
    //           )}
    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <div className='form-item'>
    //                 <FormLabel className='form-label'>
    //                   Email
    //                 </FormLabel>
    //                 <div className='flex w-full flex-col'>
    //                   <FormControl>
    //                     <Input placeholder='Enter your email' className='input-class'></Input>
    //                   </FormControl>
    //                   <FormMessage className='form-message mt-2'></FormMessage>
    //                 </div>
    //               </div>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <div className='form-item'>
    //                 <FormLabel className='form-label'>
    //                   Password
    //                 </FormLabel>
    //                 <div className='flex w-full flex-col'>
    //                   <FormControl>
    //                     <Input placeholder='Enter your password' className='input-class'></Input>
    //                   </FormControl>
    //                   <FormMessage className='form-message mt-2'></FormMessage>
    //                 </div>
    //               </div>
    //             )}
    //           />
    //           <div className='flex flex-col gap-4 w-full'>
    //             <Button type="submit" className='form-btn'>
    //               {isLoading ? (
    //                 <>
    //                   <Loader2 size={20}
    //                     className='animate-spin'
    //                   /> &nbsp;
    //                   Loading...
    //                 </>) :
    //                 type === 'sign-in'
    //                   ? 'Sign-In' : 'Sign-Up'
    //               }

    //             </Button>
    //           </div>
    //         </form>
    //       </Form>

    //     )
    //   }

    //   <footer className='flex justify-center gap-1'>
    //     <p className='font-normal text-gray-600 text-14'>
    //       {type === 'sign-in' ?
    //         "Don't have an account?"
    //         : "Already have an account?"}
    //     </p>
    //     <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
    //       {type === 'sign-in' ? 'Sign up' : 'Sign in'}
    //     </Link>
    //   </footer>
    // </section>
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user 
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Link your account to get started'
                  : 'Please enter your details'
                }
              </p>  
            </h1>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* <PlaidLink user={user} variant="primary" /> */}
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
