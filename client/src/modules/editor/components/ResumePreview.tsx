import { useDimesions } from "@/hooks/useDimesions";
import { FC, useEffect, useRef, useState } from "react";
import { ResumeValues } from "../schemas";
import Image from "next/image";
import { BadgeCheckIcon, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
}
interface PersonalInformationProps {
  resumeData: ResumeValues;
}
interface SummaryPreviewProps {
  resumeData: ResumeValues;
}
interface WorkExperiencePreviewProps {
  resumeData: ResumeValues;
}
interface EducationsPreviewProps {
  resumeData: ResumeValues;
}
interface SkillsPreviewProps {
  resumeData: ResumeValues;
}
interface ProjectsPreviewProps {
  resumeData: ResumeValues;
}

export const ResumePreview: FC<ResumePreviewProps> = ({ resumeData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimesions(containerRef);

  return (
    <div className="p-4 bg-white w-full dark:bg-black" ref={containerRef}>
      <div
        style={{
          zoom: (1 / 749) * width,
        }}
      >
        <PersonalInformationHeader resumeData={resumeData} />
        <SummaryPreview resumeData={resumeData} />
        <WorkExperiencePreview resumeData={resumeData} />
        <EducationsPreview resumeData={resumeData} />
        <SkillsPreview resumeData={resumeData} />
        <ProjectsPreview resumeData={resumeData} />
      </div>
    </div>
  );
};

const PersonalInformationHeader: FC<PersonalInformationProps> = ({
  resumeData,
}) => {
  const {
    photo,
    first_name,
    last_name,
    job_title,
    phone,
    email,
    city,
    country,
    github,
    linkedin,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objUrl) setPhotoSrc(objUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objUrl);
  }, [photo]);

  return (
    <div className="space-y-4">
      <header className="flex gap-4">
        {photoSrc && (
          <Image
            src={photoSrc}
            width={80}
            height={80}
            alt="photo"
            className="aspect-square object-cover"
          />
        )}
        <div>
          <h2 className="font-bold text-xl">
            {first_name} {last_name}
          </h2>
          <h5 className="font-medium text-xs">{job_title}</h5>
          <div className="text-muted-foreground text-xs mt-4">
            {city}
            {city && country ? "," : ""}
            {country}
            {(city || country) && (phone || email) ? " • " : ""}
            {[phone, email].filter(Boolean).join(" • ")}
            {github && (
              <div className="flex gap-1 items-center">
                <Github className="size-3" />
                {github}
              </div>
            )}
            {linkedin && (
              <div className="flex gap-1 items-center">
                <Linkedin className="size-3" />
                {linkedin}
              </div>
            )}
          </div>
        </div>
      </header>
      <main></main>
    </div>
  );
};

const SummaryPreview: FC<SummaryPreviewProps> = ({ resumeData }) => {
  const { summary } = resumeData;

  if (!summary) return;

  return (
    <div className="border-t py-2 break-inside-avoid">
      <header>
        <h3 className="font-medium text-sm uppercase">Professional Summary</h3>
      </header>
      <main className="text-xs text-gray-500 pt-2 whitespace-pre-line text-justify">
        {summary}
      </main>
    </div>
  );
};
const WorkExperiencePreview: FC<WorkExperiencePreviewProps> = ({
  resumeData,
}) => {
  const { work_experiences } = resumeData;

  const hasValue = work_experiences?.some((exp) =>
    Object.values(exp).some((value) => value !== ""),
  );

  if (!hasValue) return;

  return (
    <div className="border-t py-2 break-inside-avoid">
      <header>
        <h3 className="font-medium text-sm uppercase">Work Experience</h3>
      </header>
      <main className="space-y-4 pt-4">
        {work_experiences?.map((exp, index) => (
          <div key={index} className="text-xs font-medium">
            <div className="grid grid-cols-3 items-center">
              <h3>{exp?.position}</h3>
              <div className="text-center">
                <h3 className="mt-1">{exp?.company}</h3>
              </div>
              <div className="text-right">
                <h6>
                  {exp?.start_date} -{" "}
                  {exp?.end_date ? exp?.end_date : "Present"}
                </h6>
              </div>
            </div>
            <p className="text-xs text-gray-500 pt-2 whitespace-pre-line">
              {exp?.description}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

const EducationsPreview: FC<EducationsPreviewProps> = ({ resumeData }) => {
  const { educations } = resumeData;

  const hasValue = educations?.some((exp) =>
    Object.values(exp).some((value) => value !== ""),
  );

  if (!hasValue) return;

  return (
    <div className="border-t py-2 break-inside-avoid">
      <header>
        <h3 className="font-medium text-sm uppercase">Educations</h3>
      </header>
      <main className="space-y-4 pt-4">
        {educations?.map((edu, index) => (
          <div key={index} className="text-xs font-medium">
            <div className="flex justify-between items-center">
              <h3>{edu?.degree}</h3>
              <h6>
                {edu?.start_date} - {edu?.end_date ? edu?.end_date : "Present"}
              </h6>
            </div>
            <h3 className="mt-1 text-muted-foreground">{edu?.school}</h3>
          </div>
        ))}
      </main>
    </div>
  );
};
const SkillsPreview: FC<SkillsPreviewProps> = ({ resumeData }) => {
  const { skills } = resumeData;
  if (!skills) return;
  if (skills.length === 0) return;

  return (
    <div className="border-t py-2 break-inside-avoid">
      <header>
        <h3 className="font-medium text-sm uppercase">Skills</h3>
      </header>
      <main className="text-xs text-gray-500 pt-2 whitespace-pre-line text-justify gap-4 flex flex-wrap">
        {skills?.map((skill, index) => (
          <Badge
            variant="secondary"
            key={index}
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            <BadgeCheckIcon />
            {skill}
          </Badge>
        ))}
      </main>
    </div>
  );
};

const ProjectsPreview: FC<ProjectsPreviewProps> = ({ resumeData }) => {
  const { projects } = resumeData;

  if (!projects) return;
  if (projects.length === 0) return;

  return (
    <div className="border-t py-2 break-inside-avoid">
      <header>
        <h3 className="font-medium text-sm uppercase">Projects</h3>
      </header>
      <main className="text-xs pt-2 whitespace-pre-line text-justify gap-4 flex flex-col">
        {projects?.map((project, index) => (
          <div key={index} className="text-xs font-medium">
            <h3 className="">
              {index + 1}. {project?.name}
            </h3>
            <p className="text-xs text-gray-500 pt-2 whitespace-pre-line">
              {project?.description}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};
