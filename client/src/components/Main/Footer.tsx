import { FC } from 'react'

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
    return (
        <div className='bg-slate-900 text-slate-200 container max-w-full h-20 flex justify-center items-center'>
            <p>@ CopyWrite 2023, All Rights Reserved , Develpoed by AbdElrahman Shaban</p>
        </div>
    )
}

export default Footer