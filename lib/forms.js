// lib/forms.js

export async function submitFluentForm(data, formId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_SITE_URL}/wp-json/fluentform/v1/forms/${formId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: data }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Form submission failed");
    }

    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}
