import type { ExamConfig } from '@/types/exam';

export const exams: Record<string, ExamConfig> = {
  /* SSC */

  SSC_CGL: {
    name: 'SSC CGL',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
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
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },

  SSC_MTS: {
    name: 'SSC MTS',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },

  SSC_GD: {
    name: 'SSC GD Constable',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },

  /* UPSC */

  UPSC_CSE: {
    name: 'UPSC Civil Services',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 300,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 100,
        format: 'jpeg',
      },
    },
  },

  NDA: {
    name: 'UPSC NDA',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 300,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 100,
        format: 'jpeg',
      },
    },
  },

  CDS: {
    name: 'UPSC CDS',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 300,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 100,
        format: 'jpeg',
      },
    },
  },

  /* BANKING */

  IBPS_PO: {
    name: 'IBPS Probationary Officer',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
      thumb: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
    },
  },

  IBPS_CLERK: {
    name: 'IBPS Clerk',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
      thumb: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
    },
  },

  SBI_PO: {
    name: 'SBI Probationary Officer',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
      thumb: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
    },
  },

  SBI_CLERK: {
    name: 'SBI Clerk',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
      thumb: {
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
    },
  },

  /* RAILWAYS */

  RAILWAY_NTPC: {
    name: 'Railway NTPC',
    images: {
      photo: {
        minSizeKB: 30,
        maxSizeKB: 70,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 30,
        maxSizeKB: 70,
        format: 'jpeg',
      },
    },
  },

  RAILWAY_GROUP_D: {
    name: 'Railway Group D',
    images: {
      photo: {
        minSizeKB: 30,
        maxSizeKB: 70,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 30,
        maxSizeKB: 70,
        format: 'jpeg',
      },
    },
  },

  /* ENGINEERING */

  JEE_MAIN: {
    name: 'JEE Main',
    images: {
      photo: {
        minSizeKB: 10,
        maxSizeKB: 200,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 4,
        maxSizeKB: 30,
        format: 'jpeg',
      },
    },
  },

  GATE: {
    name: 'GATE',
    images: {
      photo: {
        minSizeKB: 20,
        maxSizeKB: 200,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 10,
        maxSizeKB: 100,
        format: 'jpeg',
      },
    },
  },

  /* MEDICAL */

  NEET: {
    name: 'NEET UG',
    images: {
      photo: {
        minSizeKB: 10,
        maxSizeKB: 200,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 4,
        maxSizeKB: 30,
        format: 'jpeg',
      },
    },
  },

  /* TEACHING */

  CTET: {
    name: 'Central Teacher Eligibility Test',
    images: {
      photo: {
        minSizeKB: 10,
        maxSizeKB: 100,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 4,
        maxSizeKB: 30,
        format: 'jpeg',
      },
    },
  },

  UGC_NET: {
    name: 'UGC NET',
    images: {
      photo: {
        minSizeKB: 10,
        maxSizeKB: 200,
        format: 'jpeg',
      },
      signature: {
        minSizeKB: 4,
        maxSizeKB: 30,
        format: 'jpeg',
      },
    },
  },
};
