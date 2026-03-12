import type { ExamConfig } from '@/types/exam';

export const exams: Record<string, ExamConfig> = {
  SSC_CGL: {
    name: 'SSC CGL',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  SSC_CHSL: {
    name: 'SSC CHSL',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  UPSC: {
    name: 'UPSC Civil Services',
    images: {
      photo: {
        width: 300,
        height: 300,
        minSizeKB: 20,
        maxSizeKB: 100,
        format: 'jpeg',
      },
      signature: {
        width: 300,
        height: 80,
        minSizeKB: 10,
        maxSizeKB: 40,
        format: 'jpeg',
      },
    },
  },
  RAILWAY_NTPC: {
    name: 'Railway NTPC',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  IBPS_PO: {
    name: 'IBPS PO',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  IBPS_CLERK: {
    name: 'IBPS Clerk',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  SBI_PO: {
    name: 'SBI PO',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  STATE_POLICE: {
    name: 'State Police Recruitment',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
      thumb: {
        width: 150,
        height: 150,
        minSizeKB: 10,
        maxSizeKB: 50,
        format: 'jpeg',
      },
    },
  },
  NDA: {
    name: 'NDA (National Defence Academy)',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
  CDS: {
    name: 'CDS (Combined Defence Services)',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
};
