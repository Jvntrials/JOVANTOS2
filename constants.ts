
import { TOSResult } from './types';

export const SYLLABUS_PLACEHOLDER = `
Course: Introduction to Biology (BIO-101)

Course Description: This course provides a comprehensive overview of the fundamental principles of biology, covering topics from the molecular basis of life to the complexity of ecosystems. It is estimated to take 18 hours of instruction.

Intended Learning Outcomes (ILOs):
Upon successful completion of this course, students will be able to:
1.  Remember the basic structures and functions of eukaryotic cells. (Cognitive Domain: Remembering)
2.  Understand the process of photosynthesis and cellular respiration. (Cognitive Domain: Understanding)
3.  Apply Mendelian genetics principles to solve basic inheritance problems. (Cognitive Domain: Applying)
4.  Analyze the relationships between different trophic levels in an ecosystem. (Cognitive Domain: Analyzing)
5.  Evaluate the evidence for the theory of evolution by natural selection. (Cognitive Domain: Evaluating)
6.  Create a simple dichotomous key for classifying a given set of organisms. (Cognitive Domain: Creating)
`;

export const EXAM_PLACEHOLDER = `
Midterm Examination - BIO-101 (Total 6 items)

Instructions: Answer all questions to the best of your ability.

Section A: Multiple Choice & Short Answer

1.  Label the parts of the animal cell provided in the diagram. (Mitochondria, Nucleus, Cell Membrane)
2.  Explain in your own words why plants appear green.
3.  A tall pea plant (TT) is crossed with a short pea plant (tt). What percentage of the offspring will be tall? Show your Punnett square.
4.  Describe the flow of energy from producers to primary consumers in a food web.
5.  Critique the argument that "evolution is just a theory" by explaining the scientific definition of a theory.
6.  You are given 5 different leaves. Design a set of yes/no questions that could be used to identify each one uniquely.
`;

export const SAMPLE_ANALYSIS_RESULT: TOSResult = {
  tableRows: [
    {
      topic: 'Cell Biology',
      intendedOutcomes: 'Remember the basic structures and functions of eukaryotic cells.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 1, understanding: 0, applying: 0, analyzing: 0, evaluating: 0, creating: 0 },
      itemPlacement: '1',
      percentage: 16.7,
    },
    {
      topic: 'Photosynthesis',
      intendedOutcomes: 'Understand the process of photosynthesis and cellular respiration.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 0, understanding: 1, applying: 0, analyzing: 0, evaluating: 0, creating: 0 },
      itemPlacement: '2',
      percentage: 16.7,
    },
    {
      topic: 'Genetics',
      intendedOutcomes: 'Apply Mendelian genetics principles to solve basic inheritance problems.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 0, understanding: 0, applying: 1, analyzing: 0, evaluating: 0, creating: 0 },
      itemPlacement: '3',
      percentage: 16.7,
    },
    {
      topic: 'Ecology',
      intendedOutcomes: 'Analyze the relationships between different trophic levels in an ecosystem.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 0, understanding: 0, applying: 0, analyzing: 1, evaluating: 0, creating: 0 },
      itemPlacement: '4',
      percentage: 16.7,
    },
    {
      topic: 'Evolution',
      intendedOutcomes: 'Evaluate the evidence for the theory of evolution by natural selection.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 0, understanding: 0, applying: 0, analyzing: 0, evaluating: 1, creating: 0 },
      itemPlacement: '5',
      percentage: 16.7,
    },
    {
      topic: 'Taxonomy/Classification',
      intendedOutcomes: 'Create a simple dichotomous key for classifying a given set of organisms.',
      totalItems: 1,
      numberOfHours: 3,
      bloomsDistribution: { remembering: 0, understanding: 0, applying: 0, analyzing: 0, evaluating: 0, creating: 1 },
      itemPlacement: '6',
      percentage: 16.7,
    },
  ],
  totals: {
    totalItems: 6,
    numberOfHours: 18,
    bloomsDistribution: { remembering: 1, understanding: 1, applying: 1, analyzing: 1, evaluating: 1, creating: 1 },
    percentage: 100,
  }
};
