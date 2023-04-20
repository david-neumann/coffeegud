import type { FC } from "react";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FormSectionWrapperProps {
  children?: React.ReactNode;
  title: string;
  expand?: boolean;
}

const FormSectionWrapper: FC<FormSectionWrapperProps> = ({
  children,
  title,
  expand,
}) => {
  const initExpand = expand ? true : false;
  const [expandSection, setExpandSection] = useState(initExpand);
  const sectionTitleMargin = expandSection ? "mb-2" : "mb-0";

  return (
    <section className="-mx-1 rounded-xl bg-slate-100 p-2 shadow dark:bg-slate-700">
      <div
        className={`flex items-center justify-between ${sectionTitleMargin}`}
      >
        <h3 className="text-xl font-medium">{title}</h3>
        {expandSection ? (
          <Minus
            size={32}
            className="cursor-pointer rounded p-1 hover:bg-slate-800"
            onClick={() => setExpandSection(false)}
          />
        ) : (
          <Plus
            size={32}
            className="cursor-pointer rounded p-1 hover:bg-slate-800"
            onClick={() => setExpandSection(true)}
          />
        )}
      </div>
      {expandSection && children}
    </section>
  );
};
export default FormSectionWrapper;
