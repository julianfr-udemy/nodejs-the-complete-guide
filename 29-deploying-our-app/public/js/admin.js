"use strict";

const remove = async (btn) => {
  try {
    const id = btn.getAttribute("data-id");
    const csrf = btn.getAttribute("data-csrf");

    await fetch(`/products/${id}`, { method: "DELETE", headers: { "csrf-token": csrf } });

    btn.closest("article").remove();
  } catch (error) {
    console.log(error);
  }
}