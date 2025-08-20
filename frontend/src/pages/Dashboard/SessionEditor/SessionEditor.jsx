import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SessionForm from "./SessionForm";
import StatusBadge from "../../../components/Status/StatusBadge";
import Alert from "../../../components/Alert/AlertMessage";
import SaveStatusIndicator from "../SessionEditor/SaveStatusIndicator";
import SessionAPI from "../../../services/api/sessionAPI";
import AutoSaveNotice from "./AutoSaveNotice";

const SessionEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // State variables
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const [status, setStatus] = useState("draft");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [lastChanged, setLastChanged] = useState(Date.now());

  // Load existing session if editing
  const loadSession = async () => {
    const data = await SessionAPI.fetchSessionById(id);
    if (data.success) {
      // console.log(data.data);
      setTitle(data.data.title);
      setTags((data.data.tags || []).join(", "));
      setStatus(data.data.status);
      setJsonFileUrl(data.data.json_file_url);
    } else {
      setError("Failed to load session data");
    }
  };

  useEffect(() => {
    if (isEditing) loadSession();
  }, [id, isEditing]);

  // Save Draft (manual + auto-save)
  const handleSaveDraft = async () => {
    setIsSaving(true);
    setSaveStatus("saving");
    try {
      const payload = {
        id,
        title,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        json_file_url: jsonFileUrl,
        status: "draft",
      };

      const data = await SessionAPI.saveDraft(payload, id);
      setSuccess("Draft saved successfully!");
      setSaveStatus("saved");
      setLastSaved(new Date());

      if (!isEditing && data.id) {
        navigate(`/session-editor/${data.id}`, { replace: true });
      }
    } catch {
      setError("Failed to save draft");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save after 5s of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || tags || jsonFileUrl) {
        handleSaveDraft();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [title, tags, jsonFileUrl, lastChanged]);

  // Manual Publish
  const handlePublish = async () => {
    if (!title.trim()) return setError("Title is required to publish");

    setIsSaving(true);
    try {
      const payload = {
        title,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        json_file_url: jsonFileUrl,
        status: "published",
      };

      await SessionAPI.publishSession(payload);
      setSuccess("Session published successfully!");
      setStatus("published");

      setTimeout(() => navigate("/dashboard/sessions"), 1000);
    } catch {
      setError("Failed to publish session");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Session" : "Create New Session"}
          </h1>
          <SaveStatusIndicator saveStatus={saveStatus} lastSaved={lastSaved} />
        </div>

        <StatusBadge status={status} />

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <SessionForm
          handlePublish={handlePublish}
          handleSubmit={handleSaveDraft}
          isSaving={isSaving}
          title={title}
          setTitle={(val) => {
            setTitle(val);
            setLastChanged(Date.now());
          }}
          tags={tags}
          setTags={(val) => {
            setTags(val);
            setLastChanged(Date.now());
          }}
          jsonFileUrl={jsonFileUrl}
          setJsonFileUrl={(val) => {
            setJsonFileUrl(val);
            setLastChanged(Date.now());
          }}
        />
        <AutoSaveNotice />
      </div>
    </div>
  );
};

export default SessionEditor;
