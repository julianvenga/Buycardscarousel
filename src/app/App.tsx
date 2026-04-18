import { HowItWorksCarousel } from './components/HowItWorksCarousel';

const cardsData = [
  {
    id: 0,
    number: '1',
    title: 'Get started',
    description: 'takes just a few minutes',
  },
  {
    id: 1,
    number: '2',
    title: 'Choose amount',
    description: 'select how much you want to exchange',
  },
  {
    id: 2,
    number: '3',
    title: 'Complete transfer',
    description: 'receive your funds instantly',
  },
];

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-[#fffef8]">
      <HowItWorksCarousel cards={cardsData} />
    </div>
  );
}
