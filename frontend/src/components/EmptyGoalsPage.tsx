import { Plus } from "lucide-react";
import welcomeImage from '../assets/coffee.svg';
import logo from '../assets/logo2.png';
import { Button } from "./Button";
import { DialogTrigger } from "./Dialog";

export function EmptyGoalsPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt='metas' />
        <img src={welcomeImage} alt='welcomeImage' className='size-96' />
        <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className='size-4'/>
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    )
}