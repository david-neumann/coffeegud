import type { FC } from "react";
import { useState } from "react";
import { Minimize2, Maximize2 } from "lucide-react";

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
    <section className="-mx-1 rounded-xl bg-slate-700 p-2">
      <div
        className={`flex items-center justify-between ${sectionTitleMargin}`}
      >
        <h3 className="font-bold">{title}</h3>
        {expandSection ? (
          <Minimize2
            size={32}
            className="cursor-pointer rounded p-1 hover:bg-slate-800"
            onClick={() => setExpandSection(false)}
          />
        ) : (
          <Maximize2
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
