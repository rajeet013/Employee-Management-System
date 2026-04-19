"use client";

import { ProductFormProps } from "@/types/types";
import { lazy } from "react";
import { useProductForm } from "./useProductForm";
const Button = lazy(() => import("@/components/ui/Button"));
const Input = lazy(() => import("@/components/ui/Input"));
const Label = lazy(() => import("@/components/ui/Label"));
const Select = lazy(() => import("@/components/ui/Select"));
const Textarea = lazy(() => import("@/components/ui/Textarea"));
const Checkbox = lazy(() => import("@/components/ui/Checkbox"));
const ImageComponent = lazy(() => import("./ImageComponent"));

const ProductForm = ({ initialData, categories }: ProductFormProps) => {
  const {
    form,
    setForm,
    handleSubmit,
    inputFields,
    selectFields,
    checkboxFields,
    handleImageChange,
    existingImages,
    handleRemoveExistingImage,
    isPending,
    router,
    fieldErrors,
  } = useProductForm({ initialData, categories });

  const getFieldError = (id: string) =>
    fieldErrors[id as keyof typeof fieldErrors];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {isPending && (
        <div className="bg-blue-50 text-lime-700 p-4 rounded-md flex items-center mb-4">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full  border-current border-t-transparent"></div>
          <p>Processing your request...</p>
        </div>
      )}
      {/* {state.success === 'false' ? (
				<div className='flex items-center justify-center'>
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4 mt-0.5' />
						<AlertDescription>
							{state.message ||
								'Something went wrong. Please try again.'}
						</AlertDescription>
					</Alert>
				</div>
			) : null} */}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <div className="space-y-2" key={field.id}>
              <Label htmlFor={field.id} required={field.required}>
                {field.label}
              </Label>
              <Input
                {...{
                  id: field.id,
                  name: field.id,
                  type: field.type,
                  value: field.value,
                  onChange: field.onChange,
                  required: false,
                }}
              />
              {getFieldError(field.id) && (
                <p className="text-sm text-red-500">
                  {getFieldError(field.id)}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
          />
          {fieldErrors["description"] && (
            <p className="text-sm text-red-500">{fieldErrors["description"]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectFields.map((field) => (
            <div className="space-y-2" key={field.id}>
              <Label htmlFor={field.id} required>
                {field.label}
              </Label>
              <Select
                {...{
                  id: field.id,
                  name: field.id,
                  options: field.options,
                  value: field.value,
                  onChange: field.onChange,
                }}
              />
              {getFieldError(field.id) && (
                <p className="text-sm text-red-500">
                  {getFieldError(field.id)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checkboxFields.map((box) => (
            <div key={box.id} className="flex items-center space-x-2">
              <Checkbox
                {...{
                  id: box.id,
                  name: box.id,
                  checked: box.checked,
                  onChange: box.onChange,
                }}
              />
              <Label {...{ htmlFor: box.id }}>{box.label}</Label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Product Images</Label>
          <ImageComponent
            {...{
              onChange: handleImageChange,
              value: existingImages,
              onRemove: handleRemoveExistingImage,
            }}
          />
          {fieldErrors["ProductImage"] && (
            <p className="text-sm text-red-500">
              {fieldErrors["ProductImage"]}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-end space-y-2 w-full sm:w-1/2 mx-auto">
        <Button
          type="submit"
          isLoading={isPending}
          className="hover:text-lime-700"
        >
          {isPending
            ? "Uploading & Saving..."
            : initialData
              ? "Update Product"
              : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
