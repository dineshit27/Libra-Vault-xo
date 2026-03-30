import { motion } from "framer-motion";
import { CreditCard, AlertTriangle, Loader2 } from "lucide-react";
import { useMyBorrows, usePayFine } from "@/hooks/useLibraryData";
import { toast } from "sonner";

const MyFines = () => {
  const { data: borrows = [], isLoading } = useMyBorrows();
  const payMutation = usePayFine();
  const fines = borrows.filter((b) => b.fineAmount > 0);
  const totalFine = fines.reduce((sum, b) => sum + b.fineAmount, 0);

  const handlePay = (borrowId: string) => {
    payMutation.mutate(borrowId, {
      onSuccess: () => toast.success("Fine paid successfully!"),
      onError: (err: any) => toast.error(err.message || "Failed to pay fine"),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-black">My Fines</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {totalFine > 0 && (
            <motion.div
              className="brutal-card bg-primary p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-primary-foreground" />
                <div>
                  <p className="font-heading font-bold text-primary-foreground text-sm">Total Outstanding</p>
                  <p className="font-heading text-3xl font-black text-primary-foreground">${totalFine.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {fines.map((b) => (
              <motion.div
                key={b.id}
                className="brutal-card p-4 rounded-lg flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div>
                  <h3 className="font-heading font-bold">{b.bookTitle}</h3>
                  <p className="text-sm text-muted-foreground">Due: {new Date(b.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-xl font-black text-destructive">${b.fineAmount.toFixed(2)}</span>
                  <button
                    onClick={() => handlePay(b.id)}
                    disabled={payMutation.isPending}
                    className="brutal-btn bg-primary text-primary-foreground rounded-md text-sm font-heading disabled:opacity-50"
                  >
                    {payMutation.isPending && payMutation.variables === b.id ? "Paying..." : "Pay"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {fines.length === 0 && (
            <div className="text-center py-16">
              <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-heading text-lg font-bold">No fines!</h3>
              <p className="text-sm text-muted-foreground">You're all clear. Keep it up!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyFines;
