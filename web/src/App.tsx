import { useEffect, useState } from 'react'
import { MagnifyingGlassPlus } from 'phosphor-react'

import logoImg from './assets/logo-nlw-esports.png'
import game1 from './assets/games/game-1.png'
import game2 from './assets/games/game-2.png'
import game3 from './assets/games/game-3.png'
import game4 from './assets/games/game-4.png'
import game5 from './assets/games/game-5.png'
import game6 from './assets/games/game-6.png'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from './components/Form/Input'


interface Game {
  id : string;
  title : string;
  bannerUrl : string;
  _count : {
    ads : number
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [games, setGames] = useState<Game[]>([])
  
  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center mt-20'>
      <img src={logoImg} alt=""/>

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui</h1>

      <div className='grid grid-cols-6 gap-4 mt-16'>
        {
          games.map((item, index) => 
            <GameBanner 
              key={index}
              title={item.title} 
              adsCount={item._count.ads} 
              bannerUrl={item.bannerUrl}
            />
          )
        }
          
      </div>

      <Dialog.Root>
        
        <CreateAdBanner/>  

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúcio</Dialog.Title>

            <Dialog.Description >
              <form className='mt-8'>
                <div  className='flex flex-col gap-2'>
                  <label className='font-white font-semibold' htmlFor='game'> Qual o game?</label>
                  <Input 
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' 
                    id="game" 
                    type="text" 
                    placeholder='Selecione o game que deseja jogar'/>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-white font-semibold' htmlFor='name'>Seu nome (nickname)</label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder='Como te chamam no jogo'/>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='font-white font-semibold' htmlFor='yarsPlaying'>Joga há quantos anos?</label>
                    <Input 
                      id="yarsPlaying" 
                      type="number" 
                      placeholder='Tudo bem ser ZERO'/>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='font-white font-semibold' htmlFor='discord'>Qual seu Discord?</label>
                    <Input 
                      id="discord" 
                      type="text" 
                      placeholder='Usuario#0000'/>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='font-white font-semibold' htmlFor='discord'>Quando costuma jogar?</label>
                    
                    <div className='grid grid-cols-4 gap-2'>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Domingo'>
                          D
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Segunda'>
                          S
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Terca'>
                          T
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Quarta'>
                          Q
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Quinta'>
                          Q
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Sexta'>
                          S
                      </button>
                      <button
                        className='w-8 h-8 rounded bg-zinc-900' 
                        title='Sábado'>
                          S
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label className='font-white font-semibold' htmlFor='discord'>Qual o horário do dia?</label>

                    <div className='flex gap-2'>
                      <Input 
                        id="hourStart" 
                        type="time" 
                        placeholder='De'/>
                      <Input 
                        id="hourEnd" 
                        type="time" 
                        placeholder='Até'/>
                    </div>
                  </div>
                </div>

                <div className='mt-2 flex gap-2 text-sm'>
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close 
                    type='button'
                    className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                      Cancelar
                  </Dialog.Close>
                  <button 
                    type='submit' 
                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                    <GameController size={24}/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Description>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      

    </div>
  )
}

export default App 
