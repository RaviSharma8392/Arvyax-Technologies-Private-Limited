import React from "react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Button from "../../../components/Buttons/Button";

const SessionForm = ({
  handlePublish,
  jsonFileUrl,
  handleSubmit,
  isSaving,
  title,
  tags,
  setTitle,
  setTags,
  setJsonFileUrl,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1">
              Session Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your session"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter comma-separated tags (e.g., yoga, meditation, beginner)"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Tags help users discover your session. Separate with commas.
            </p>
          </div>

          {/* JSON File URL Field */}
          <div>
            <label
              htmlFor="jsonFileUrl"
              className="block text-sm font-medium text-gray-700 mb-1">
              Session Content URL *
            </label>
            <input
              id="jsonFileUrl"
              type="url"
              value={jsonFileUrl}
              onChange={(e) => setJsonFileUrl(e.target.value)}
              placeholder="https://example.com/session-data.json"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              URL to the JSON file containing your session content and
              structure.
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
          {/* cancel button */}
          <Button
            to="/my-sessions"
            variant="secondary"
            children={"Cancel"}></Button>

          <div className="flex space-x-3">
            {/* Save Draft button */}
            <PrimaryButton
              onClick={handleSubmit}
              disabled={isSaving || !title || !tags}
              loading={isSaving}
              label="Save Draft"
              variant="secondary"
            />

            {/* Publish button */}
            <PrimaryButton
              onClick={handlePublish}
              disabled={isSaving || !title || !tags}
              loading={isSaving}
              label="Publish Session"
              variant="secondary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
