import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Calco from "@/assets/calculator.svg";
const MIN_SOCIAL_INCOME = 933;
const MAX_SOCIAL_INCOME = 3750;

interface SalaryResults {
  grossSalary: string;
  pensionContribution: string;
  healthContribution: string;
  additionalPensionContribution: string;
  totalSocialSecurity: string;
  incomeTax: string;
  netSalary: string;
}

export const Calculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<"employment" | "civil">("employment");
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [isStudent, setIsStudent] = useState<string>("no");
  const [isInsuredElsewhere, setIsInsuredElsewhere] = useState<string>("no");
  const [results, setResults] = useState<SalaryResults | null>(null);

  const calculateSocialSecurityForEmployment = (salary: number) => {
    const adjustedSalary = Math.min(Math.max(salary, MIN_SOCIAL_INCOME), MAX_SOCIAL_INCOME);

    let pensionRate = 0.1198; // 11.98%
    let healthRate = 0.0658; // 6.58%
    const additionalPensionRate = 0.022; // 2.2%

    if (isStudent === "yes") {
      pensionRate = 0;
      healthRate = isInsuredElsewhere === "yes" ? 0 : 0.032;
    }

    const pensionContribution = adjustedSalary * pensionRate;
    const healthContribution = adjustedSalary * healthRate;
    const additionalPensionContribution = adjustedSalary * additionalPensionRate;

    return {
      pensionContribution,
      healthContribution,
      additionalPensionContribution,
      totalSocialSecurity: pensionContribution + healthContribution + additionalPensionContribution,
    };
  };

  const calculateSocialSecurityForCivil = (salary: number) => {
    return {
      pensionContribution: 0,
      healthContribution: 0,
      additionalPensionContribution: 0,
      totalSocialSecurity: 0,
    };
  };

  const calculateIncomeTax = (salary: number, totalSocialSecurity: number) => {
    const taxableIncome = salary - totalSocialSecurity;
    const taxRate = 0.1;
    return taxableIncome * taxRate;
  };

  // Основна функция за изчисление на нетната заплата
  const calculateSalary = () => {
    const salary = parseFloat(grossSalary);

    if (isNaN(salary) || salary <= 0) {
      alert("Моля, въведете валидна брутна заплата");
      return;
    }

    let pensionContribution, healthContribution, additionalPensionContribution, totalSocialSecurity;

    if (calculatorType === "employment") {
      ({
        pensionContribution,
        healthContribution,
        additionalPensionContribution,
        totalSocialSecurity,
      } = calculateSocialSecurityForEmployment(salary));
    } else {
      ({
        pensionContribution,
        healthContribution,
        additionalPensionContribution,
        totalSocialSecurity,
      } = calculateSocialSecurityForCivil(salary));
    }

    const incomeTax = calculateIncomeTax(salary, totalSocialSecurity);
    const netSalary = salary - totalSocialSecurity - incomeTax;

    setResults({
      grossSalary: salary.toFixed(2),
      pensionContribution: pensionContribution.toFixed(2),
      healthContribution: healthContribution.toFixed(2),
      additionalPensionContribution: additionalPensionContribution.toFixed(2),
      totalSocialSecurity: totalSocialSecurity.toFixed(2),
      incomeTax: incomeTax.toFixed(2),
      netSalary: netSalary.toFixed(2),
    });
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex-1 md:text-left">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Salary calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RadioGroup
                  value={calculatorType}
                  onValueChange={(value: "employment" | "civil") => setCalculatorType(value)}
                  className="flex justify-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employment" id="employment" />
                    <Label htmlFor="employment">Employment contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="civil" id="civil" />
                    <Label htmlFor="civil">Civil contract</Label>
                  </div>
                </RadioGroup>

                {/* Въвеждане на брутна заплата */}
                <div className="space-y-2">
                  <Label>Gross salary (BGN)</Label>
                  <Input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    placeholder="Enter gross salary"
                  />
                  <p className="text-sm text-gray-500">
                    Minimum insured income: {MIN_SOCIAL_INCOME} BGN
                    <br />
                    Maximalen insured income: {MAX_SOCIAL_INCOME} BGN
                  </p>
                </div>

                {calculatorType === "employment" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Are you a student or a full-time student under 26 years old?</Label>
                      <RadioGroup
                        value={isStudent}
                        onValueChange={(value: string) => setIsStudent(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="student-yes" />
                          <Label htmlFor="student-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="student-no" />
                          <Label htmlFor="student-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Are you insured at another workplace?</Label>
                      <RadioGroup
                        value={isInsuredElsewhere}
                        onValueChange={(value: string) => setIsInsuredElsewhere(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="insured-yes" />
                          <Label htmlFor="insured-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="insured-no" />
                          <Label htmlFor="insured-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Бутон за изчисление */}
                <Button onClick={calculateSalary} className="w-full">
                  Calculate
                </Button>

                {results && (
                  <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                    <h3 className="font-bold text-center">Results</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Gross salary:</span>
                      <span className="text-right">{results.grossSalary} BGN</span>
                      <span>Pension contributions:</span>
                      <span className="text-right">{results.pensionContribution} BGN</span>
                      <span>Health contributions:</span>
                      <span className="text-right">{results.healthContribution} BGN</span>
                      <span>Additional insurance:</span>
                      <span className="text-right">
                        {results.additionalPensionContribution} BGN
                      </span>
                      <span>Total insurance:</span>
                      <span className="text-right">{results.totalSocialSecurity} BGN</span>
                      <span>Income tax:</span>
                      <span className="text-right">{results.incomeTax} BGN</span>
                      <hr className="col-span-2 border-t" />
                      <span className="font-bold">Net salary:</span>
                      <span className="text-right font-bold">{results.netSalary} BGN</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  The results are for informational purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <img src={Calco} alt="Partners" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};
