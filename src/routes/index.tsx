import { useTheme } from '@/client/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

const themes = ['light', 'dark', 'system'] as const;

function Index() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='px-5 py-10 text-center'>
      <p className='font-medium'>
        Current Theme: <span className='capitalize'>{theme}</span>
      </p>
      <div className='flex items-center justify-center gap-5 mt-5'>
        {themes.map((val) => (
          <Button key={val} className='capitalize' type='button' onClick={() => setTheme(val)} disabled={val === theme}>
            {val}
          </Button>
        ))}
      </div>
    </div>
  );
}
