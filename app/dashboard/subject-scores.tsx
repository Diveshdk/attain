"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Subject, StudentCOScore } from "@/lib/types";
import { LucideArrowLeft } from "lucide-react";

interface SubjectScoresProps {
  subject: Subject;
  onBack: () => void;
}

export function SubjectScores({ subject, onBack }: SubjectScoresProps) {
  const [scores, setScores] = useState<StudentCOScore[]>([]);
  const [newRollNumber, setNewRollNumber] = useState("");

  const COS = Array.from({ length: 6 }, (_, i) => `CO${i + 1}`);

  const addStudent = () => {
    if (newRollNumber && !scores.find(s => s.rollNumber === newRollNumber)) {
      const newStudentScore: StudentCOScore = {
        rollNumber: newRollNumber,
        scores: Object.fromEntries(COS.map(co => [co, { score: 0, outOf: 100 }]))
      };
      setScores([...scores, newStudentScore]);
      setNewRollNumber("");
    }
  };

  const updateScore = (rollNumber: string, co: string, field: 'score' | 'outOf', value: number) => {
    setScores(scores.map(student => {
      if (student.rollNumber === rollNumber) {
        return {
          ...student,
          scores: {
            ...student.scores,
            [co]: {
              ...student.scores[co],
              [field]: value
            }
          }
        };
      }
      return student;
    }));
  };

  const calculateTotal = (studentScore: StudentCOScore) => {
    return Object.values(studentScore.scores).reduce(
      (acc, curr) => acc + (curr.score / curr.outOf) * 100,
      0
    ) / Object.keys(studentScore.scores).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack}>
          <LucideArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{subject.name} - CO Scores</h1>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Enter Roll Number"
            value={newRollNumber}
            onChange={(e) => setNewRollNumber(e.target.value)}
          />
          <Button onClick={addStudent}>Add Student</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Roll Number</th>
                {COS.map(co => (
                  <th key={co} className="p-4">
                    <div className="text-center">{co}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm font-normal">
                      <span>Score</span>
                      <span>Out of</span>
                    </div>
                  </th>
                ))}
                <th className="p-4">Total (%)</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(student => (
                <tr key={student.rollNumber} className="border-b">
                  <td className="p-4">{student.rollNumber}</td>
                  {COS.map(co => (
                    <td key={co} className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          min="0"
                          value={student.scores[co].score}
                          onChange={(e) => updateScore(student.rollNumber, co, 'score', Number(e.target.value))}
                          className="w-full"
                        />
                        <Input
                          type="number"
                          min="1"
                          value={student.scores[co].outOf}
                          onChange={(e) => updateScore(student.rollNumber, co, 'outOf', Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    {calculateTotal(student).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}