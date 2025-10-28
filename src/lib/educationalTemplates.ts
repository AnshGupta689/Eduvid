import { AnimationScene, easeInOutCubic, easeOutBounce } from './animationEngine';
import { QuizQuestion } from '../components/QuizModal';

export type EducationalTemplate = {
  name: string;
  category: string;
  keywords: string[];
  generateScenes: () => AnimationScene[];
  quizQuestions: QuizQuestion[];
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  alpha: number = 1
) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha: number = 1
) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

export const drawArrow = (
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  color: string,
  alpha: number = 1
) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  const angle = Math.atan2(toY - fromY, toX - fromX);
  const headLength = 20;

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

export const photosynthesisTemplate: EducationalTemplate = {
  name: 'Photosynthesis',
  category: 'biology',
  keywords: ['photosynthesis', 'plant', 'chlorophyll', 'sunlight', 'glucose', 'oxygen'],
  generateScenes: () => [
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, 'PHOTOSYNTHESIS', width / 2, height / 2 - 50, 48, '#10b981', alpha);
        drawText(ctx, 'How Plants Make Food', width / 2, height / 2 + 20, 24, '#6ee7b7', alpha);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;

        drawCircle(ctx, centerX, centerY - 80, 40, '#fbbf24', 1);
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const length = 60 + Math.sin(progress * Math.PI * 4) * 10;
          const x1 = centerX + Math.cos(angle) * 45;
          const y1 = centerY - 80 + Math.sin(angle) * 45;
          const x2 = centerX + Math.cos(angle) * length;
          const y2 = centerY - 80 + Math.sin(angle) * length;
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        const arrowProgress = easeInOutCubic(Math.min(progress * 1.5, 1));
        if (arrowProgress > 0) {
          drawArrow(
            ctx,
            centerX,
            centerY - 40,
            centerX,
            centerY + 20 - (1 - arrowProgress) * 60,
            '#10b981',
            arrowProgress
          );
        }

        drawCircle(ctx, centerX - 40, centerY + 30, 25, '#10b981', 1);
        drawCircle(ctx, centerX + 40, centerY + 30, 25, '#10b981', 1);
        ctx.fillStyle = '#065f46';
        ctx.fillRect(centerX - 15, centerY + 30, 30, 80);

        drawText(ctx, 'Sunlight', centerX + 80, centerY - 80, 18, '#fbbf24', 1);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;

        drawText(ctx, 'CO₂ + H₂O', centerX - 150, centerY - 80, 28, '#06b6d4', 1);

        const plusAlpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, '+', centerX, centerY - 80, 36, '#ffffff', plusAlpha);

        drawText(ctx, 'Light Energy', centerX, centerY - 20, 24, '#fbbf24', 1);

        const arrowAlpha = easeInOutCubic(Math.max((progress - 0.3) * 1.5, 0));
        if (arrowAlpha > 0) {
          drawArrow(ctx, centerX, centerY + 20, centerX, centerY + 80, '#10b981', arrowAlpha);
        }

        const resultAlpha = easeInOutCubic(Math.max((progress - 0.5) * 2, 0));
        drawText(ctx, 'Glucose + O₂', centerX, centerY + 120, 32, '#10b981', resultAlpha);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));

        drawCircle(ctx, width / 2 - 100, height / 2 - 30, 50, '#10b981', alpha);
        drawText(ctx, '🌱', width / 2 - 100, height / 2 - 30, 48, '#ffffff', alpha);

        drawCircle(ctx, width / 2 + 100, height / 2 - 30, 50, '#06b6d4', alpha);
        drawText(ctx, '🌍', width / 2 + 100, height / 2 - 30, 48, '#ffffff', alpha);

        drawText(ctx, 'Plants feed themselves', width / 2, height / 2 + 60, 22, '#10b981', alpha);
        drawText(ctx, 'and produce oxygen for us!', width / 2, height / 2 + 95, 22, '#06b6d4', alpha);
      },
    },
  ],
  quizQuestions: [
    {
      question: 'What is the main purpose of photosynthesis?',
      options: [
        'To produce water for the plant',
        'To make glucose (food) for the plant',
        'To release carbon dioxide',
        'To absorb nitrogen from the air',
      ],
      correctAnswer: 1,
      explanation: 'Photosynthesis is how plants make their own food (glucose) using sunlight, water, and carbon dioxide.',
    },
    {
      question: 'What does a plant need for photosynthesis?',
      options: [
        'Only water',
        'Only sunlight',
        'Sunlight, water, and carbon dioxide',
        'Oxygen and nitrogen',
      ],
      correctAnswer: 2,
      explanation: 'Plants need three main ingredients: sunlight (for energy), water (H₂O), and carbon dioxide (CO₂) from the air.',
    },
    {
      question: 'What does photosynthesis produce as a byproduct that we breathe?',
      options: [
        'Carbon dioxide',
        'Nitrogen',
        'Oxygen',
        'Hydrogen',
      ],
      correctAnswer: 2,
      explanation: 'During photosynthesis, plants release oxygen (O₂) as a byproduct, which is essential for humans and animals to breathe!',
    },
  ],
};

export const newtonsThirdLawTemplate: EducationalTemplate = {
  name: "Newton's Third Law",
  category: 'physics',
  keywords: ['newton', 'third law', 'motion', 'force', 'action', 'reaction'],
  generateScenes: () => [
    {
      duration: 2.5,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, "NEWTON'S THIRD LAW", width / 2, height / 2 - 50, 42, '#ef4444', alpha);
        drawText(ctx, 'Action = Reaction', width / 2, height / 2 + 20, 28, '#fca5a5', alpha);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        drawText(ctx, 'For every action...', width / 2, 100, 24, '#ffffff', 1);

        const boxX = width / 2 - 50;
        const boxY = height / 2 - 40;

        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(boxX, boxY, 100, 80);

        const wallX = width / 2 + 150;
        ctx.fillStyle = '#64748b';
        ctx.fillRect(wallX, height / 2 - 100, 30, 200);

        const forceProgress = easeOutBounce(Math.min(progress * 1.2, 1));
        const pushDistance = forceProgress * 80;

        drawArrow(
          ctx,
          boxX + 100,
          boxY + 40,
          boxX + 100 + pushDistance,
          boxY + 40,
          '#ef4444',
          1
        );

        if (progress > 0.4) {
          const reactionProgress = easeInOutCubic(Math.max((progress - 0.4) * 1.5, 0));
          drawArrow(
            ctx,
            wallX,
            height / 2,
            wallX - pushDistance * reactionProgress,
            height / 2,
            '#10b981',
            reactionProgress
          );
        }

        drawText(ctx, 'PUSH', boxX + 100 + pushDistance / 2, boxY - 20, 18, '#ef4444', 1);
        if (progress > 0.4) {
          const textAlpha = Math.max((progress - 0.4) * 1.5, 0);
          drawText(ctx, 'PUSH BACK', wallX - 40, height / 2 - 30, 18, '#10b981', textAlpha);
        }
      },
    },
    {
      duration: 3.5,
      render: (ctx, progress, width, height) => {
        const centerY = height / 2;

        drawCircle(ctx, width / 2 - 80, centerY, 40, '#f59e0b', 1);
        drawCircle(ctx, width / 2 + 80, centerY, 40, '#8b5cf6', 1);

        const bounceProgress = Math.sin(progress * Math.PI);
        const displacement = bounceProgress * 20;

        drawArrow(
          ctx,
          width / 2 - 40,
          centerY,
          width / 2 - 40 + displacement,
          centerY,
          '#ef4444',
          1
        );

        drawArrow(
          ctx,
          width / 2 + 40,
          centerY,
          width / 2 + 40 - displacement,
          centerY,
          '#10b981',
          1
        );

        drawText(ctx, 'Action Force', width / 2 - 80, centerY - 80, 20, '#ef4444', 1);
        drawText(ctx, 'Reaction Force', width / 2 + 80, centerY - 80, 20, '#10b981', 1);
        drawText(ctx, 'Equal & Opposite', width / 2, centerY + 100, 24, '#ffffff', 1);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));

        drawText(ctx, 'Real World Examples:', width / 2, 120, 28, '#ffffff', alpha);

        const examples = [
          { text: '🚀 Rocket pushes gas down, gas pushes rocket up', y: 200 },
          { text: '🏊 Swimmer pushes water back, moves forward', y: 260 },
          { text: '🚶 Walking: foot pushes ground, ground pushes you', y: 320 },
        ];

        examples.forEach((example, index) => {
          const itemAlpha = easeInOutCubic(Math.max((progress - index * 0.2) * 1.5, 0));
          drawText(ctx, example.text, width / 2, example.y, 20, '#fbbf24', itemAlpha);
        });
      },
    },
  ],
  quizQuestions: [
    {
      question: "What does Newton's Third Law state?",
      options: [
        'Objects in motion stay in motion',
        'Force equals mass times acceleration',
        'For every action, there is an equal and opposite reaction',
        'Energy cannot be created or destroyed',
      ],
      correctAnswer: 2,
      explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
    },
    {
      question: 'When you push on a wall, what does the wall do?',
      options: [
        'Nothing happens',
        'The wall pushes back on you with equal force',
        'The wall moves away',
        'The wall absorbs the force',
      ],
      correctAnswer: 1,
      explanation: 'The wall pushes back on you with the same amount of force you applied. Action and reaction forces are always equal and opposite!',
    },
    {
      question: 'Which is an example of Newton\'s Third Law?',
      options: [
        'A ball rolling down a hill',
        'A rocket launching by pushing exhaust gases downward',
        'Water freezing into ice',
        'A magnet attracting metal',
      ],
      correctAnswer: 1,
      explanation: 'A rocket works by pushing gases down (action), which pushes the rocket up (reaction). This is a perfect example of Newton\'s Third Law!',
    },
  ],
};

export const moleculeTemplate: EducationalTemplate = {
  name: 'Molecules',
  category: 'chemistry',
  keywords: ['molecule', 'atom', 'bond', 'chemistry', 'compound', 'water'],
  generateScenes: () => [
    {
      duration: 2.5,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, 'MOLECULES', width / 2, height / 2 - 50, 52, '#06b6d4', alpha);
        drawText(ctx, 'Building Blocks of Matter', width / 2, height / 2 + 20, 24, '#67e8f9', alpha);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;

        const atomProgress = easeOutBounce(Math.min(progress * 1.5, 1));

        drawCircle(ctx, centerX - 100, centerY, 40 * atomProgress, '#ef4444', 1);
        drawCircle(ctx, centerX + 100, centerY, 40 * atomProgress, '#3b82f6', 1);

        if (progress > 0.5) {
          const bondProgress = easeInOutCubic(Math.max((progress - 0.5) * 2, 0));
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(centerX - 60, centerY);
          ctx.lineTo(centerX - 60 + (160 * bondProgress), centerY);
          ctx.stroke();
        }

        const labelAlpha = easeInOutCubic(Math.max((progress - 0.3) * 2, 0));
        drawText(ctx, 'Atom', centerX - 100, centerY - 70, 20, '#ef4444', labelAlpha);
        drawText(ctx, 'Atom', centerX + 100, centerY - 70, 20, '#3b82f6', labelAlpha);

        if (progress > 0.7) {
          const bondLabelAlpha = easeInOutCubic(Math.max((progress - 0.7) * 3, 0));
          drawText(ctx, 'Chemical Bond', centerX, centerY + 70, 22, '#fbbf24', bondLabelAlpha);
        }
      },
    },
    {
      duration: 3.5,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;

        drawText(ctx, 'H₂O - Water Molecule', centerX, 100, 28, '#06b6d4', 1);

        drawCircle(ctx, centerX, centerY, 50, '#ef4444', 1);
        drawText(ctx, 'O', centerX, centerY, 32, '#ffffff', 1);

        const angle1 = -Math.PI / 6;
        const angle2 = -Math.PI + Math.PI / 6;
        const distance = 100;

        const h1X = centerX + Math.cos(angle1) * distance;
        const h1Y = centerY + Math.sin(angle1) * distance;
        const h2X = centerX + Math.cos(angle2) * distance;
        const h2Y = centerY + Math.sin(angle2) * distance;

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(h1X, h1Y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(h2X, h2Y);
        ctx.stroke();

        const h1Scale = 0.6 + Math.sin(progress * Math.PI * 3) * 0.1;
        const h2Scale = 0.6 + Math.cos(progress * Math.PI * 3 + Math.PI) * 0.1;

        drawCircle(ctx, h1X, h1Y, 35 * h1Scale, '#3b82f6', 1);
        drawText(ctx, 'H', h1X, h1Y, 28, '#ffffff', 1);

        drawCircle(ctx, h2X, h2Y, 35 * h2Scale, '#3b82f6', 1);
        drawText(ctx, 'H', h2X, h2Y, 28, '#ffffff', 1);

        drawText(ctx, '104.5°', centerX, centerY + 100, 20, '#ffffff', 0.7);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));

        drawText(ctx, 'Molecules are everywhere!', width / 2, 120, 26, '#06b6d4', alpha);

        const molecules = [
          { symbol: 'H₂O', name: 'Water', color: '#06b6d4', y: 200 },
          { symbol: 'O₂', name: 'Oxygen', color: '#ef4444', y: 260 },
          { symbol: 'CO₂', name: 'Carbon Dioxide', color: '#8b5cf6', y: 320 },
          { symbol: 'C₆H₁₂O₆', name: 'Glucose (Sugar)', color: '#10b981', y: 380 },
        ];

        molecules.forEach((mol, index) => {
          const itemAlpha = easeInOutCubic(Math.max((progress - index * 0.15) * 2, 0));
          drawText(ctx, `${mol.symbol} - ${mol.name}`, width / 2, mol.y, 22, mol.color, itemAlpha);
        });
      },
    },
  ],
  quizQuestions: [
    {
      question: 'What is a molecule?',
      options: [
        'A single atom',
        'Two or more atoms bonded together',
        'A type of cell',
        'A form of energy',
      ],
      correctAnswer: 1,
      explanation: 'A molecule is formed when two or more atoms bond together chemically. They are the building blocks of matter!',
    },
    {
      question: 'How many atoms are in a water molecule (H₂O)?',
      options: [
        '1 atom',
        '2 atoms',
        '3 atoms',
        '4 atoms',
      ],
      correctAnswer: 2,
      explanation: 'Water (H₂O) has 3 atoms: 2 hydrogen atoms (H) and 1 oxygen atom (O) bonded together.',
    },
    {
      question: 'What holds atoms together in a molecule?',
      options: [
        'Gravity',
        'Magnetism',
        'Chemical bonds',
        'Friction',
      ],
      correctAnswer: 2,
      explanation: 'Atoms are held together by chemical bonds, which are strong attractive forces between atoms.',
    },
  ],
};

export const airTemplate: EducationalTemplate = {
  name: 'Air Composition',
  category: 'chemistry',
  keywords: ['air', 'atmosphere', 'oxygen', 'nitrogen', 'gas', 'breathe'],
  generateScenes: () => [
    {
      duration: 2.5,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, 'WHAT IS AIR?', width / 2, height / 2 - 50, 48, '#06b6d4', alpha);
        drawText(ctx, "The Invisible Mix We Breathe", width / 2, height / 2 + 20, 24, '#67e8f9', alpha);
      },
    },
    {
      duration: 3.5,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;

        drawText(ctx, 'Air Composition', centerX, 80, 28, '#ffffff', 1);

        const gases = [
          { name: 'Nitrogen', percent: 78, color: '#3b82f6', angle: 0 },
          { name: 'Oxygen', percent: 21, color: '#ef4444', angle: 0.78 * 2 * Math.PI },
          { name: 'Other', percent: 1, color: '#10b981', angle: 0.99 * 2 * Math.PI },
        ];

        const radius = 100;
        const animProgress = easeInOutCubic(Math.min(progress * 1.3, 1));

        let startAngle = -Math.PI / 2;

        gases.forEach((gas) => {
          const sliceAngle = (gas.percent / 100) * 2 * Math.PI * animProgress;

          ctx.fillStyle = gas.color;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          ctx.stroke();

          const labelAngle = startAngle + sliceAngle / 2;
          const labelDistance = radius + 60;
          const labelX = centerX + Math.cos(labelAngle) * labelDistance;
          const labelY = centerY + Math.sin(labelAngle) * labelDistance;

          const labelAlpha = easeInOutCubic(Math.max((progress - 0.3) * 1.5, 0));
          drawText(ctx, gas.name, labelX, labelY - 15, 20, gas.color, labelAlpha);
          drawText(ctx, `${gas.percent}%`, labelX, labelY + 15, 22, '#ffffff', labelAlpha);

          startAngle += sliceAngle;
        });
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const centerX = width / 2;

        for (let i = 0; i < 30; i++) {
          const x = (i % 10) * 60 + 100;
          const y = Math.floor(i / 10) * 80 + 150;
          const delay = i * 0.02;
          const particleProgress = Math.max((progress - delay) * 1.5, 0);

          if (particleProgress > 0) {
            const wobble = Math.sin(progress * Math.PI * 4 + i) * 3;
            const alpha = Math.min(particleProgress, 1);

            let color;
            if (i % 10 < 7) {
              color = '#3b82f6';
            } else if (i % 10 < 9) {
              color = '#ef4444';
            } else {
              color = '#10b981';
            }

            drawCircle(ctx, x + wobble, y + wobble, 8, color, alpha);
          }
        }

        const textAlpha = easeInOutCubic(Math.min(progress * 2, 1));
        drawText(ctx, 'Air molecules are constantly moving!', centerX, 80, 24, '#ffffff', textAlpha);
        drawText(ctx, 'Blue = Nitrogen  |  Red = Oxygen  |  Green = Others', centerX, height - 50, 18, '#94a3b8', textAlpha);
      },
    },
    {
      duration: 3,
      render: (ctx, progress, width, height) => {
        const alpha = easeInOutCubic(Math.min(progress * 2, 1));

        drawCircle(ctx, width / 2 - 120, height / 2, 60, '#ef4444', alpha);
        drawText(ctx, 'O₂', width / 2 - 120, height / 2, 32, '#ffffff', alpha);

        const arrowAlpha = easeInOutCubic(Math.max((progress - 0.3) * 1.5, 0));
        if (arrowAlpha > 0) {
          drawArrow(ctx, width / 2 - 60, height / 2, width / 2 + 60, height / 2, '#10b981', arrowAlpha);
        }

        const bodyAlpha = easeInOutCubic(Math.max((progress - 0.5) * 2, 0));
        drawCircle(ctx, width / 2 + 120, height / 2, 60, '#06b6d4', bodyAlpha);
        drawText(ctx, '❤️', width / 2 + 120, height / 2, 40, '#ffffff', bodyAlpha);

        drawText(ctx, 'We need oxygen to survive!', width / 2, height / 2 + 120, 24, '#fbbf24', alpha);
      },
    },
  ],
  quizQuestions: [
    {
      question: 'What is the most abundant gas in the air we breathe?',
      options: [
        'Oxygen',
        'Carbon dioxide',
        'Nitrogen',
        'Hydrogen',
      ],
      correctAnswer: 2,
      explanation: 'Nitrogen makes up about 78% of the air we breathe. Oxygen, which we need to survive, is only about 21%!',
    },
    {
      question: 'What percentage of air is oxygen?',
      options: [
        '10%',
        '21%',
        '50%',
        '78%',
      ],
      correctAnswer: 1,
      explanation: 'Oxygen makes up about 21% of air. We breathe it in to survive, and it powers our cells!',
    },
    {
      question: 'Why do we need oxygen from the air?',
      options: [
        'To make our bones strong',
        'To help our body produce energy',
        'To keep our hair growing',
        'To help us think faster',
      ],
      correctAnswer: 1,
      explanation: 'Our cells use oxygen to convert food into energy through a process called cellular respiration. Without oxygen, we cannot survive!',
    },
  ],
};

export const allTemplates: EducationalTemplate[] = [
  photosynthesisTemplate,
  newtonsThirdLawTemplate,
  moleculeTemplate,
  airTemplate,
];

export const findBestTemplate = (prompt: string): EducationalTemplate => {
  const lowerPrompt = prompt.toLowerCase();

  for (const template of allTemplates) {
    if (template.keywords.some(keyword => lowerPrompt.includes(keyword))) {
      return template;
    }
  }

  return moleculeTemplate;
};
