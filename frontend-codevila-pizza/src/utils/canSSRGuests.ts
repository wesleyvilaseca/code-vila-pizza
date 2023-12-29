"use server"
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export async function canSSRGuest() {
    const cookies = parseCookies();
    console.log(cookies)
}


// export async function canSSRGuest<P>(fn: GetServerSideProps<P>) {
//     return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
//         const cookies = parseCookies(ctx);

//         if(cookies['@nextauth.token']) {
//             return {
//                 redirect: {
//                     destination: '/dashboard',
//                     permanent: false
//                 }
//             }
//         }
//         return await fn(ctx);
//     }
// }
