"use client";

import { useEffect, useState } from "react";
import { Label } from "@assets/components/ui/label";
import { Input } from "@assets/components/ui/input";
import { Textarea } from "@assets/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@assets/components/ui/select";

const sectionMap: any = {
  hero: {
    label: "Hero",
    variants: {
      simpleHero: {
        label: "Simple Hero",
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "subtitle", label: "Subtitle", type: "text" },
        ],
      },
      withImageTiles: {
        label: "With Image Tiles",
        fields: [
          { name: "heading", label: "Heading", type: "string" },
          { name: "description", label: "Description", type: "text" },
        ],
      },
    },
  },
  features: {
    label: "Features",
    variants: {
      featuresGrid: {
        label: "Grid Layout",
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "features", label: "Features", type: "text" },
        ],
      },
    },
  },
};

export const EditComponent = ({ value = {}, onChange }: any) => {
  const [section, setSection] = useState(value.section || "");
  const [variant, setVariant] = useState(value.variant || "");

  const handleFieldChange = (field: string, val: any) => {
    onChange({
      section,
      variant,
      values: {
        ...value.values,
        [field]: val,
      },
    });
  };

  const selectedVariant = sectionMap?.[section]?.variants?.[variant] || {
    fields: [],
  };

  useEffect(() => {
    onChange({
      section,
      variant,
      values: {},
    });
  }, [section, variant]);

  return (
    <div className="space-y-4">
      {/* Section Select */}
      <Label>Section</Label>
      <Select value={section} onValueChange={setSection}>
        <SelectTrigger>
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sectionMap).map(([key, s]: any) => (
            <SelectItem key={key} value={key}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Variant Select */}
      {section && (
        <>
          <Label>Variant</Label>
          <Select value={variant} onValueChange={setVariant}>
            <SelectTrigger>
              <SelectValue placeholder="Select Variant" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sectionMap[section].variants).map(
                ([vKey, v]: any) => (
                  <SelectItem key={vKey} value={vKey}>
                    {v.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </>
      )}

      {/* Dynamic Field Rendering */}
      {selectedVariant.fields.map(
        (field: { name: string; label: string; type: string }) => (
          <div key={field.name}>
            <Label>{field.label}</Label>
            {field.type === "string" ? (
              <Input
                value={value.values?.[field.name] || ""}
                onChange={e => handleFieldChange(field.name, e.target.value)}
              />
            ) : (
              <Textarea
                value={value.values?.[field.name] || ""}
                onChange={e => handleFieldChange(field.name, e.target.value)}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};
