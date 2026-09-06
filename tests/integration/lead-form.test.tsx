import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "@/components/LeadForm";

describe("formulario de captación", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  it("envía nombre, email y plan seleccionado", async () => {
    render(<LeadForm />);

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Persona de integración" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "integracion@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Plan que te interesa"), {
      target: { value: "onix-lt-mt" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /quiero que me contacten/i }).closest("form")!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining('"planSlug":"onix-lt-mt"'),
      }),
    );
    expect(await screen.findByText("Listo. Un asesor va a contactarte muy pronto.")).toBeTruthy();
  });
});
