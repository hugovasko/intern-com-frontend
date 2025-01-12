import i18n from "@/i18n/i18n";
import { Languages } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const LanguageSelector: FC<LanguageSelectorProps> = () => {
  const { t } = useTranslation();
  const [language, setLanguge] = useState<string>(i18n.language);
  const handleLanguageChange = (language: string) => {
    setLanguge(language);
    i18n.changeLanguage(language);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages size={23} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("languageSelector.selectLanguage", "firstLetter")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="en">{t("languageSelector.en", "firstLetter")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bg">{t("languageSelector.bg", "firstLetter")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface LanguageSelectorProps {}
