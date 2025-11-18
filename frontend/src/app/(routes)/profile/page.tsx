"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Aliyan Jabbar");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameSave = () => {
    if (tempName.trim() !== "") {
      setName(tempName);
    }
    setIsEditingName(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-[100px] px-6 space-y-10">
      <h1 className="text-4xl font-semibold mx-auto w-fit">Your profile</h1>

      {/* Profile Photo */}
      <section className="space-y-4 border-b pb-6">
        <h2 className="text-lg font-medium">Profile Photo</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="relative">
            {/* Make image clickable by wrapping in label */}
            <label htmlFor="profileUpload" className="cursor-pointer">
              <div className="w-20 h-20 rounded-full overflow-hidden group">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-700 text-white text-2xl lg:text-4xl font-semibold ">
                    AJ
                  </div>
                )}

                <span className="w-20 h-20 rounded-full absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <Camera className="text-white" />
                </span>
              </div>
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              id="profileUpload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setProfileImage(url);
                }
              }}
            />
          </div>

          <div className="space-x-3">
            <Button
              size="lg"
              className="bg-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              Change photo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setProfileImage(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove photo
            </Button>
          </div>
        </div>
      </section>

      {/* Name */}
      <section className="space-y-4 border-b pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">Name</p>

            {isEditingName ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameSave();
                  if (e.key === "Escape") {
                    setTempName(name);
                    setIsEditingName(false);
                  }
                }}
                autoFocus
                className="border rounded px-2 py-1 font-medium"
              />
            ) : (
              <p className="font-medium">{name}</p>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setTempName(name);
              setIsEditingName(true);
            }}
          >
            Edit
          </Button>
        </div>
      </section>

      {/* Email */}
      <section className="space-y-4 border-b pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Email address</p>
            <p className="font-medium">jabbaraliyan805@gmail.com</p>
          </div>
          <Button variant="outline">Edit</Button>
        </div>
      </section>

      {/* Language */}
      <section className="space-y-4 border-b pb-6">
        <Label className="text-sm font-medium">Language</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="English (US)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English (US)</SelectItem>
            <SelectItem value="en-uk">English (UK)</SelectItem>
            <SelectItem value="ur">Urdu</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Connected Accounts */}
      <section className="space-y-4 border-b pb-6">
        <h2 className="text-lg font-medium">Connected social accounts</h2>
        <div className="border p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="24"
              width="24"
            >
              <path
                fill="#4285f4"
                d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
              ></path>
              <path
                fill="#34a853"
                d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
              ></path>
              <path
                fill="#fbbc02"
                d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
              ></path>
              <path
                fill="#ea4335"
                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
              ></path>
            </svg>
            <div>
              <p className="font-medium">Google</p>
              <p className="text-sm text-muted-foreground">aliyan jabbar</p>
            </div>
          </div>
          <Button variant="outline">Disconnect</Button>
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-6">
        <h2 className="text-lg font-medium">Preferences</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Link opening</p>
            <p className="text-sm text-muted-foreground">
              Open designs in a new tab
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Open links in desktop app</p>
            <p className="text-sm text-muted-foreground">
              On desktop, links will open in the app instead of the browser
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Video editing</p>
            <p className="text-sm text-muted-foreground">
              Use new beta editor for videos
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </section>
    </div>
  );
}
